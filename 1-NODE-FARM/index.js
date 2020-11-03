const { time } = require('console');
const fs = require ('fs');
const http = require ('http');
const url = require ('url');

/////////////////////////////////////////////////////////////////////////
// FILE

// Blocking / Synchronous way 

/* const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is what I know about Avacado: ${textIn}.\nCreate on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!'); */


// Non-Blocking / Asynchronous way

/* fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('ERROR :(((((');

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
                console.log('File written!');
            })
        });
    });
});
console.log('Code in proccessing...'); */



/////////////////////////////////////////////////////////////////////////
// SERVER


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); // <-- storage data as it is (text format)
const dataObj = JSON.parse(data); // <-- Create object for 'data.json' (convert file for use in code)

const server = http.createServer((req, res) => { // Creating server, via Module 'http' and method 'createServer'
    const pathName = req.url; // <-- request, can be multiple
    const ex = `This is current URL: ${pathName}`;

    if (pathName === '/' || pathName === '/overview'){ // <-- request, '/' or '/overview' url
        res.end('Hello, My name is OVERVIEW!'); // <-- response (res.end), should be only one in block scope
    }
    else if (pathName === '/product'){ // <-- request, '/product' url
        res.writeHead(200, {
            'Content-style': 'text/html',
            'Current-url': pathName
        });
        res.end(`<h1>hoho, Im, Mr.PRODUCT</h1> \n <h2>${ex}</h2>`);
    }

    else if (pathName === '/api'){ // <-- request, '/api' url
            res.writeHead(200, { 
                'Content-style': 'application/json',
                'Current-url': pathName
            });
            res.end(data);
    }

    else {
        res.writeHead(404, {
            'Content-style': 'text/html',
            'Current-url': pathName,
            'My-own-header': 'Headerchjik'
        });
        res.end(`<h1>Page NOT found!</h1> \n <h2>${ex}</h2>`);
    };
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Server listening...');
})