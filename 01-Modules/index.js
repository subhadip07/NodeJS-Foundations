const fs = require('node:fs'); // Built in module
// console.log(fs);

// Read a file
const content = fs.readFileSync('notes.txt', 'utf-8')
// console.log(content);

// Writing a file
fs.writeFileSync('copy.txt', 'I want to write this', 'utf-8');

// adding contents in a same file without overiding it
fs.appendFileSync('copy.txt', content, 'utf-8');

// Creating directory and folder inside
fs.mkdirSync('games/xyx/a', {recursive: true});

// Removing the directory
fs.rmdirSync('games');

fs.unlinkSync('copy.txt');