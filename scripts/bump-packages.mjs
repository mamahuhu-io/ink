#!/usr/bin/env node
/**
 * Package version bump script for Ink monorepo
 * Updates version numbers across packages/* subdirectories
 *
 * Usage:
 *   pnpm bump:packages <new-version>              # Update all packages
 *   pnpm bump:packages <new-version> --scope=stone  # Only stone packages
 *   pnpm bump:packages <new-version> --scope=well   # Only well packages
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const packagesDir = path.join(root, 'packages');

// Parse arguments
const args = process.argv.slice(2);
const newVersion = args.find((arg) => !arg.startsWith('--'));
const scopeArg = args.find((arg) => arg.startsWith('--scope='));
const scope = scopeArg ? scopeArg.split('=')[1] : null;

// Display help
if (!newVersion) {
  console.log('🔖 Ink Packages Version Bump Tool\n');
  console.log('Usage: pnpm bump:packages <new-version> [--scope=<scope>]\n');
  console.log('Options:');
  console.log('  --scope=stone    Only update @ink/stone-* packages');
  console.log('  --scope=well     Only update @ink/well-* packages');
  console.log('  (no scope)       Update all packages\n');
  console.log('Examples:');
  console.log('  pnpm bump:packages 0.26.0');
  console.log('  pnpm bump:packages 0.26.0 --scope=stone');
  console.log('  pnpm bump:packages 0.2.0 --scope=well\n');
  process.exit(1);
}

// Validate version format
const versionRegex = /^\d+\.\d+\.\d+(-[\w.]+)?$/;
if (!versionRegex.test(newVersion)) {
  console.error(`❌ Invalid version format: ${newVersion}`);
  console.error('   Expected format: X.Y.Z or X.Y.Z-suffix (e.g., 0.26.0, 1.0.0-beta.1)');
  process.exit(1);
}

// Validate scope
const validScopes = ['stone', 'well'];
if (scope && !validScopes.includes(scope)) {
  console.error(`❌ Invalid scope: ${scope}`);
  console.error(`   Valid scopes: ${validScopes.join(', ')}`);
  process.exit(1);
}

/**
 * Recursively find all package.json files in a directory
 */
function findPackageJsonFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && entry.name !== 'node_modules') {
      findPackageJsonFiles(fullPath, files);
    } else if (entry.name === 'package.json') {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Check if a package matches the scope filter
 */
function matchesScope(packageName, scope) {
  if (!scope) return true;
  if (scope === 'stone') return packageName.startsWith('@ink/stone-');
  if (scope === 'well') return packageName.startsWith('@ink/well-');
  return false;
}

// Find all package.json files
const packageFiles = findPackageJsonFiles(packagesDir);

const scopeLabel = scope ? `@ink/${scope}-*` : 'all';
console.log(`\n📦 Bumping ${scopeLabel} packages to ${newVersion}\n`);

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const filePath of packageFiles) {
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const packageName = content.name;

    // Skip if doesn't match scope
    if (!matchesScope(packageName, scope)) {
      skippedCount++;
      continue;
    }

    // Skip if no version field
    if (!content.version) {
      console.log(`   ⊘ ${packageName}: no version field`);
      skippedCount++;
      continue;
    }

    const oldVersion = content.version;
    content.version = newVersion;
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');

    console.log(`   ✓ ${packageName}: ${oldVersion} → ${newVersion}`);
    updatedCount++;
  } catch (error) {
    console.error(`   ❌ ${path.relative(root, filePath)}: ${error.message}`);
    errorCount++;
  }
}

console.log('');
console.log(`📊 Summary: ${updatedCount} updated, ${skippedCount} skipped, ${errorCount} errors`);

if (errorCount > 0) {
  console.log('\n⚠️  Version bump completed with errors');
  process.exit(1);
} else if (updatedCount > 0) {
  console.log(`\n🎉 Successfully bumped ${updatedCount} packages to ${newVersion}`);
  console.log('\nNext steps:');
  console.log('  1. Review the changes: git diff');
  console.log('  2. Commit: git commit -am "chore: bump packages to ' + newVersion + '"');
} else {
  console.log('\n⚠️  No packages were updated');
}
