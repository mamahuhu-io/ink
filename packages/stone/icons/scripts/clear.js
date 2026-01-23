const fs = require('fs-extra');

async function clear(dir) {
  await fs.emptyDir(dir);
}

clear('./icons/auto');