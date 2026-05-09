const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // If the line has 'glass', remove 'border border-white/10'
    let lines = content.split('\n');
    let updated = lines.map(line => {
      if (line.includes('glass') && line.includes('border border-white/10')) {
        return line.replace('border border-white/10', '');
      }
      if (line.includes('border border-white/10')) {
        return line.replace('border border-white/10', 'border border-slate-200 dark:border-white/10');
      }
      if (line.includes('border-white/10') && !line.includes('dark:border-white/10')) {
        return line.replace('border-white/10', 'border-slate-200 dark:border-white/10');
      }
      return line;
    });
    
    fs.writeFileSync(filePath, updated.join('\n'));
  }
});
