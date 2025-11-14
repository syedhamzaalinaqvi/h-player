const fs = require('fs');
const path = require('path');

// Usage:
// node import-playlist.js /path/to/Series_Name.json
// The script will copy the JSON into this folder and create a sanitized filename.

function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9-_\.]/gi, '_');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node import-playlist.js /path/to/series.json');
    process.exit(1);
  }

  for (const filePath of args) {
    try {
      const abs = path.resolve(filePath);
      if (!fs.existsSync(abs)) {
        console.error('File not found:', abs);
        continue;
      }

      const content = fs.readFileSync(abs, 'utf8');
      const parsed = JSON.parse(content);

      // Determine filename
      const seriesName = parsed && parsed.seriesName ? parsed.seriesName : path.basename(abs, path.extname(abs));
      const filename = sanitizeFilename(seriesName) + '.json';
      const dest = path.join(__dirname, filename);

      fs.writeFileSync(dest, JSON.stringify(parsed, null, 2), 'utf8');
      console.log('Imported:', dest);
    } catch (e) {
      console.error('Error importing', filePath, e.message || e);
    }
  }
}

main();
