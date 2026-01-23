const changeCase = require("change-case");

/**
 * Filter icons by icon pascal name.
 * @param {Array<{id: string; name: string}>} icons
 * @returns {Array<{id: string; name: string}>}
 */
function iconNameFilter(icons) {
  const set = new Set();
  const repeatNames = new Set();

  const filtered = icons.filter((icon) => {
    const name = changeCase.pascalCase(icon.name);
    if (set.has(name)) {
      repeatNames.add(name);
      return false;
    }
    set.add(name);
    return true;
  });

  if (repeatNames.size) {
    console.warn(`Warning: repeat names: ${Array.from(repeatNames)}`);
  }

  return filtered;
}

/**
 *
 * @param {string} name
 * @returns
 */
function getIconName(name, size = 24) {
  const prefix = {
    16: "Small",
    20: "Middle",
    24: "",
  }[size];
  return `${prefix}${name}Icon`;
}

const treeNodeTypes = ["GROUP", "FRAME"];
const leafNodeTypes = ["COMPONENT", "INSTANCE"];

function flattenNodeGroup(children) {
  const result = [];
  const walk = (node, path = []) => {
    if (treeNodeTypes.includes(node.type)) {
      node.children.forEach(child => walk(child, [...path, node.name]));
    } else if (leafNodeTypes.includes(node.type)) {
      result.push({ ...node, path });
    } else {
      console.warn(
        `Unsupported node type: ${node.type}, please check design file`
      );
    }
  };
  children.forEach(child => walk(child));
  return result;
}

module.exports = {
  iconNameFilter,
  getIconName,
  flattenNodeGroup,
};
