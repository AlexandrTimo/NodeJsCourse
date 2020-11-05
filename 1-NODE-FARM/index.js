const { time } = require('console');
const fs = require ('fs');
const http = require ('http');
const { parse } = require('path');
const url = require ('url');

const replaceTemplates = require('./modules/replaceTemplates'); // <-- import mudule/(function) 'replaceTemplates'

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

const tempOverview = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product-template.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card-template.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); // <-- storage data as it is (text format)
const dataObj = JSON.parse(data); // <-- Create object for 'data.json' (convert file for use in code)

const server = http.createServer((req, res) => { // Creating server, via Module 'http' and method 'createServer'
    
    const curUrl = url.parse(req.url, true).path;
    //console.log(curUrl);
    const ex = `This is current URL: ${curUrl}`;

    const { query, pathname } = url.parse(req.url, true); // <-- request, can be multiple
    

// OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview'){ // <-- request, '/' or '/overview' url
        res.writeHead(200, { 
            'Content-style': 'text/html',
            'Current-url': curUrl
    });

        const cardsHtml = dataObj.map(el => replaceTemplates(tempCard, el)).join(''); // <-- new array with replaced templates (Ex.{%PRICE%})
        const output = tempOverview.replace(/{%CARDS%}/g, cardsHtml); // <-- output of main page (OVERVIEW) replaced {%CARDS%} to cardsHtml
        res.end(output); // <-- response (res.end), should be only one in the block scope
    }

// PRODUCT PAGE
    else if (pathname === '/product'){ // <-- request, '/product' url
        res.writeHead(200, {
            'Content-style': 'text/html',
            'Current-url': curUrl
        });
        const productJson = dataObj[query.id]; // <-- Current object with ID from json file
        const output = replaceTemplates(tempProduct, productJson); // <-- repalced templates (Ex.{%PRICE%}) in 'html file' by 'json file'

        res.end(output);
    }

// API PAGE
    else if (pathname === '/api'){ // <-- request, '/api' url
        res.writeHead(200, { 
            'Content-style': 'application/json',
            'Current-url': curUrl
        });
        res.end(data);
    }

// PAGE NOT FOUND
    else {
        res.writeHead(404, {
            'Content-style': 'text/html',
            'Current-url': pathName,
            'My-own-header': 'Headerchjik'
        });
        res.end(`<h1>Page NOT found!</h1> \n <h2>${ex}</h2>`);
    };
});

// OPEN PORT
server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening...');
})

