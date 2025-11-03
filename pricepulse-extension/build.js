#!/usr/bin/env node

/**
 * Simple build script for PricePulse
 * This script is optional - the extension works without building
 */

const fs = require('fs');
const path = require('path');

console.log('🔨 Building PricePulse Extension...\n');

// Check if required files exist
const requiredFiles = [
  'manifest.json',
  'src/popup/popup.html',
  'src/dashboard/dashboard.html',
  'src/background/service-worker.js',
  'src/content/content-script.js'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.error('\n❌ Build failed: Missing required files');
  process.exit(1);
}

console.log('\n✨ Build completed successfully!');
console.log('\n📦 Extension is ready to load in your browser');
console.log('📖 See INSTALL.md for installation instructions\n');
