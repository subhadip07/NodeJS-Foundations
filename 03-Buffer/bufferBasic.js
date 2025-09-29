const { Buffer } = require("buffer");

// const buf = Buffer.alloc(4);
// console.log(buf[1]);

// const buf = Buffer.from("Hello");
// console.log(buf);
// console.log(buf.toString());

const bufTwo = Buffer.allocUnsafe(10);
console.log(bufTwo);

const buf = Buffer.alloc(10);
buf.write('Hello');
console.log(buf.toString());

const bufthree = Buffer.from("Subh");
console.log(bufthree);
bufthree[0] = 0x4A
console.log(bufthree);
console.log(bufthree.toString());

// buffer concatenation
const buf1 = Buffer.from("Sun and");
const buf2 = Buffer.from(" Moon");
const merged = Buffer.concat([buf1, buf2])
console.log(merged.toString());
console.log(merged.length);


