#!/usr/bin/env node
/**
 * Version bump script for Ink desktop application
 * Updates version numbers across all relevant configuration files
 *
 * Usage: pnpm bump <new-version>
 * Example: pnpm version 1.0.1
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const newVersion = process.argv[2];

// Display help if no version provided
if (!newVersion) {
  console.log('🔖 Ink Version Bump Tool\n');
  console.log('Usage: pnpm bump <new-version>\n');
  console.log('Examples:');
  console.log('  pnpm bump 1.0.3');
  console.log('  pnpm bump 2.0.0-beta.1\n');
  process.exit(1);
}

// Validate version format (semver-like)
const versionRegex = /^\d+\.\d+\.\d+(-[\w.]+)?$/;
if (!versionRegex.test(newVersion)) {
  console.error(`❌ Invalid version format: ${newVersion}`);
  console.error('   Expected format: X.Y.Z or X.Y.Z-suffix (e.g., 1.0.3, 2.0.0-beta.1)');
  process.exit(1);
}

// Files that need version updates
const files = [
  { path: 'apps/desktop/package.json', type: 'json' },
  { path: 'apps/desktop/src-tauri/tauri.conf.json', type: 'json' },
  { path: 'apps/desktop/src-tauri/Cargo.toml', type: 'toml' },
];

console.log(`\n📦 Bumping version to ${newVersion}\n`);

let hasError = false;

for (const file of files) {
  const filePath = path.join(root, file.path);

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${file.path}`);
      hasError = true;
      continue;
    }

    if (file.type === 'json') {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const oldVersion = content.version;
      content.version = newVersion;
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
      console.log(`   ✓ ${file.path}: ${oldVersion} → ${newVersion}`);
    } else if (file.type === 'toml') {
      let content = fs.readFileSync(filePath, 'utf-8');
      const match = content.match(/^version\s*=\s*"(.+?)"/m);
      const oldVersion = match ? match[1] : 'unknown';
      content = content.replace(/^version\s*=\s*".+?"/m, `version = "${newVersion}"`);
      fs.writeFileSync(filePath, content);
      console.log(`   ✓ ${file.path}: ${oldVersion} → ${newVersion}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${file.path}: ${error.message}`);
    hasError = true;
  }
}

console.log('');

if (hasError) {
  console.log('⚠️  Version bump completed with errors');
  process.exit(1);
} else {
  console.log(`🎉 Version successfully bumped to ${newVersion}`);
  console.log('\nNext steps:');
  console.log('  1. Review the changes: git diff');
  console.log('  2. Commit: git commit -am "chore: bump version to ' + newVersion + '"');
  console.log('  3. Tag: git tag v' + newVersion);
}
