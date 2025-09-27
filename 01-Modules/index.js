const fs = require('fs'); // Built in module
// console.log(fs);

// Read a file
const content = fs.readFileSync('notes.txt', 'utf-8')
console.log(content);
