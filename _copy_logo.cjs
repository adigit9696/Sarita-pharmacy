const fs = require('fs');
const path = require('path');
const src = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '51117230-1867-4b59-b6fd-471cc6c3c8ac', 'media__1780945264389.png');
const dst = path.join(__dirname, 'public', 'logo.png');
try {
  fs.copyFileSync(src, dst);
  console.log('OK:' + fs.statSync(dst).size);
} catch(e) {
  // Try the jpg version
  try {
    const src2 = path.join(process.env.USERPROFILE, '.gemini', 'antigravity-ide', 'brain', '51117230-1867-4b59-b6fd-471cc6c3c8ac', 'media__1780908463634.jpg');
    const dst2 = path.join(__dirname, 'public', 'logo.jpg');
    fs.copyFileSync(src2, dst2);
    console.log('OK-JPG:' + fs.statSync(dst2).size);
  } catch(e2) {
    console.log('ERR:' + e.message + ' | ' + e2.message);
  }
}
