import fs from 'fs';
import path from 'path';

// Configuration
const artifactsDir = 'all-artifacts';
const outputFile = 'latest.json';
const baseUrl = process.env.DOWNLOAD_BASE_URL;
// Remove 'v' prefix if present for semver compliance in JSON (optional, but Tauri usually likes cleaner versions)
const version = (process.env.VERSION || '0.0.0').replace(/^v/, ''); 
const notes = process.env.NOTES || '';
const pubDate = new Date().toISOString();

console.log(`Generating manifest for version: ${version}`);
console.log(`Base URL: ${baseUrl}`);

// Map filenames to platform keys used by Tauri
// Tauri keys: darwin-aarch64, darwin-x86_64, windows-x86_64, linux-x86_64
function getPlatformKey(filename) {
  const lower = filename.toLowerCase();
  
  if (lower.endsWith('.app.tar.gz')) {
    if (lower.includes('aarch64')) return 'darwin-aarch64';
    if (lower.includes('x86_64')) return 'darwin-x86_64';
    if (lower.includes('universal')) return 'darwin-universal';
  }
  
  if (lower.endsWith('.nsis.zip')) {
    if (lower.includes('x64')) return 'windows-x86_64';
    if (lower.includes('x86')) return 'windows-i686';
    if (lower.includes('arm64')) return 'windows-aarch64';
  }

  if (lower.endsWith('.appimage.tar.gz')) {
    if (lower.includes('amd64') || lower.includes('x86_64')) return 'linux-x86_64';
  }
  
  return null;
}

const manifest = {
  version,
  notes,
  pub_date: pubDate,
  platforms: {}
};

try {
  const files = fs.readdirSync(artifactsDir);
  
  // Process signature files first
  // We assume every update package has a corresponding .sig file
  const sigFiles = files.filter(f => f.endsWith('.sig'));
  
  for (const sigFile of sigFiles) {
    // Original package name is sig filename minus .sig
    const pkgFile = sigFile.slice(0, -4);
    
    if (!files.includes(pkgFile)) {
      console.warn(`Warning: Found signature ${sigFile} but missing package ${pkgFile}`);
      continue;
    }

    const platform = getPlatformKey(pkgFile);
    if (!platform) {
      console.warn(`Warning: Could not determine platform for ${pkgFile}`);
      continue;
    }

    const signature = fs.readFileSync(path.join(artifactsDir, sigFile), 'utf-8');
    const url = `${baseUrl}/${pkgFile}`; // GitHub Releases uses direct filename in URL

    manifest.platforms[platform] = {
      signature,
      url
    };
    
    console.log(`Added ${platform}: ${pkgFile}`);
  }

  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log(`Successfully wrote ${outputFile}`);
  
} catch (error) {
  console.error('Error generating manifest:', error);
  process.exit(1);
}
