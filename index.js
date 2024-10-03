const fs = require('fs');
const path = require('path');

const files = [
  { filename: 'file1.json', content: '{"name": "File 1", "valid": true}' },
  { filename: 'file2.json', content: 'random text' },
  { filename: 'file3.json', content: '{"name": "File 3", "valid": true}' },
  { filename: 'file4.json', content: 'not a json' },
  { filename: 'file5.json', content: '{"name": "File 5", "valid": true}' },
  { filename: 'file6.json', content: 'invalid json' },
  { filename: 'file7.json', content: '{"name": "File 7", "valid": true}' },
  { filename: 'file8.json', content: 'another random string' },
  { filename: 'file9.json', content: '{"name": "File 9", "valid": true}' },
  { filename: 'file10.json', content: 'this is not json' }
];

function writeFile(filePath, content) {
  return fs.writeFileSync(filePath, content);
}

files.forEach(file => {
  writeFile(path.join(__dirname, file.filename), file.content);
});

function readAndProcessFiles() {
  files.forEach(file => {
    let result = '';
    try {
      const data = fs.readFileSync(path.join(__dirname, file.filename), 'utf-8');
      
      const parsedData = JSON.parse(data);
      console.log(`Successfully parsed: ${JSON.stringify(parsedData)}`);
      
      result = `${file.filename}\nOK\n`;
    } catch (error) {
      console.log(`Error parsing file: ${file.filename}`);
      
      result = `${file.filename}\nNOK\n`;
    } finally {
      fs.appendFileSync(path.join(__dirname, 'result.txt'), result);
    }
  });
}

readAndProcessFiles();
