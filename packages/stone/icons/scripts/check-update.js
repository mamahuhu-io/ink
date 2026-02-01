/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Set package.json version to 0.0.1 to publish the first version.
 * Otherwise, it will compare with the registry versions.
 * If it's new version, ci will publish it.
 */

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const pkg = fs.readFileSync(path.resolve(__dirname, `../package.json`), {
  encoding: 'utf-8',
});

const currentVersion = JSON.parse(pkg).version;
console.log(`current version: ${currentVersion}`);

if (currentVersion === '0.0.1') {
  console.log('Publish First Version');
  fs.writeFileSync(path.resolve(__dirname, '../.check_update.res'), 'need_publish=true');
  process.exit(0);
}

const versionsProcess = child_process.spawn('npm', ['show', `@stone/icons`, 'versions', '--json']);

let versionsResult = '';
versionsProcess.stdout.on('data', (data) => {
  versionsResult = versionsResult + data;
});

let versionsError = '';
versionsProcess.stderr.on('data', (data) => {
  versionsError = versionsError + data;
});

versionsProcess.on('close', (code) => {
  console.log(`fetched version list, close code: ${code}.`);
  if (code !== 0) {
    console.error(versionsError);
    process.exit(-1);
    return;
  }
  const versions = JSON.parse(versionsResult);
  console.log(versionsResult);

  if (versions.includes(currentVersion)) {
    console.log('Already exist.');
    fs.writeFileSync(path.resolve(__dirname, '../.check_update.res'), 'need_publish=false');
  } else {
    console.log('Publish');
    fs.writeFileSync(path.resolve(__dirname, '../.check_update.res'), 'need_publish=true');
  }
});
