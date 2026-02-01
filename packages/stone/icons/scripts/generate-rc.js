/* eslint-disable @typescript-eslint/no-require-imports */
const svgr = require('@svgr/core');
const utils = require('./utils');

function addSvgWrapper(svgContent, size) {
  return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 ${size} ${size}"
    width="1em"
    height="1em"
    fill="none"
    style="user-select:none;flex-shrink:0;"
  >
    ${svgContent}
  </svg>
`;
}

/**
 *
 * @param {string} svg
 * @param {string} name
 * @param {number} size
 * @returns {string}
 */
async function generateRC(svg, name, size, replaceColor = true) {
  // eslint-disable-next-line no-useless-escape
  let svgContent = svg.match(/<svg [^>]+>([\s\S]*?)<\/svg>/)[1];
  if (replaceColor) {
    const colorRegex = /(fill|stroke)="#[0-9a-fA-F]+"/g;
    svgContent = svgContent.replaceAll(colorRegex, "$1='currentColor'");
  }
  svgContent = addSvgWrapper(svgContent, size);
  const code = await svgr.transform(
    svgContent,
    {
      icon: true,
      typescript: true,
      plugins: ['@svgr/plugin-jsx'],
    },
    { componentName: utils.getIconName(name) },
  );
  return code;
}

module.exports = generateRC;
