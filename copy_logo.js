const fs = require('fs');
const path = require('path');

const src = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '51117230-1867-4b59-b6fd-471cc6c3c8ac', 'media__1780831297988.jpg');
const dest = path.join(__dirname, 'public', 'logo.jpg');

try {
  fs.copyFileSync(src, dest);
  console.log('✓ Logo copied successfully to public/logo.jpg (' + fs.statSync(dest).size + ' bytes)');
} catch (e) {
  console.error('Error:', e.message);
}
