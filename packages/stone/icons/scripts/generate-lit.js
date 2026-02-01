/* eslint-disable @typescript-eslint/no-require-imports */
function addSvgWrapper(svgContent, size) {
  return `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 ${size} ${size}"
    width=\${width}
    height=\${height}
    fill="none"
    style=\${'user-select:none;flex-shrink:0;' + style}
  >
    ${svgContent}
  </svg>
`;
}

async function generateLit(svg, name, size, replaceColor = true) {
  let svgContent = svg.match(/<svg [^>]+>([\s\S]*?)<\/svg>/)[1];
  if (replaceColor) {
    const colorRegex = /(fill|stroke)="#[0-9a-fA-F]+"/g;
    svgContent = svgContent.replaceAll(colorRegex, "$1='currentColor'");
  }
  const generated = `import { html } from 'lit';
const ${name} =
  ({ width = '1em', height = '1em', style = '' }: { width?: string, height?: string, style?: string } = {}) =>
    html\`${addSvgWrapper(svgContent, size)}\`;
export default ${name};
`;
  return generated;
}

module.exports = generateLit;
