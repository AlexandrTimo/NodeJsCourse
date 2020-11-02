const { time } = require('console');
const fs = require ('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textIn);

const textOut = `This is what I know about Avacado: ${textIn}.\nCreate on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

console.log('File written!');
