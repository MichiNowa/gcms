const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'assets', 'public', 'js', 'react');

fs.readdirSync(outDir).forEach(file => {
  if (file.endsWith('.js')) {
    const oldPath = path.join(outDir, file);
    const newPath = path.join(outDir, file.replace(/\.js$/, '.mjs'));

    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldPath} -> ${newPath}`);
  }
});
