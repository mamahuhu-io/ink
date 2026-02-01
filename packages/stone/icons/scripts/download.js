/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs-extra');
const changeCase = require('change-case');
const initializeAPI = require('./figma-api');
const utils = require('./utils');
const svgo = require('./svgo');
const generateRC = require('./generate-rc');
const generateLit = require('./generate-lit');

const fileId = process.env.figma_file_id;
const nodeId = process.env.figma_node_id;
const token = process.env.figma_token;
const size = parseInt(process.env.size);
const iconDir = size ? `./icons/auto/${size}` : `./icons/auto`;

const skipColorReplace = ['Colorful'];
async function download() {
  const api = await initializeAPI(token);
  const tree = await api.getChildren(fileId, nodeId);
  const data = utils.flattenNodeGroup(tree);
  const icons = utils.iconNameFilter(data);
  const svgUrlMap = await api.getSvgUrls(fileId, icons.map((i) => i.id).join(','));

  const indexFileIconNames = [];
  await Promise.all(
    icons.map(async (icon) => {
      const replaceColor = !skipColorReplace.includes(icon.path[0]);
      const name = changeCase.pascalCase(icon.name);
      const downloadLink = svgUrlMap[icon.id];
      if (!downloadLink) {
        return;
      }
      console.log(`${name}:${icon.id}`);
      const svgContent = await api.downloadSvg(downloadLink, name);
      const optimized = svgo.optimize(svgContent);
      await fs.outputFile(`${iconDir}/svg/${name}.svg`, optimized.data);
      const fcCode = await generateRC(optimized.data, name, size, replaceColor);
      await fs.outputFile(`${iconDir}/rc/${name}.tsx`, fcCode);
      const litCode = await generateLit(optimized.data, name, size, replaceColor);
      await fs.outputFile(`${iconDir}/lit/${name}.ts`, litCode);

      indexFileIconNames.push(name);
    }),
  );

  const rcIndexFileContent = indexFileIconNames
    .sort()
    .map((name) => {
      return `export { default as ${utils.getIconName(name, size)} } from "./rc/${name}";`;
    })
    .join('\n');
  await fs.outputFile(`${iconDir}/rc.ts`, rcIndexFileContent);

  const litIndexFileContent = indexFileIconNames
    .sort()
    .map((name) => {
      return `export { default as ${utils.getIconName(name, size)} } from "./lit/${name}";`;
    })
    .join('\n');
  await fs.outputFile(`${iconDir}/lit.ts`, litIndexFileContent);
}

download();
