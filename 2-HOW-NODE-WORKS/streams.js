const fs = require ('fs');
const { request } = require('http');
const server = require ('http').createServer();

 server.on ('request', (req, res) => {

    // -- Solution 1 --
    /* fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
    }); */

    // -- Solution 2: Streaming --
    /* const readable = fs.createReadStream('test-file.txt'); // <-- Created read Stream
        readable.on('data', chunk => { // <-- Loading and sending data peace by peace 
        res.write(chunk);
    });
    readable.on('end', () => {  // <-- Stop streaming
        res.end();
    });
    readable.on('error', err => { // <-- Checking errors
        console.log(err);
        res.statusCode = 404;
        res.end('File NOT found!');
    });  */

    // -- Solution 3: Streaming + pipe() --
    const readable = fs.createReadStream('test-file.txt'); // <-- Created read Stream
    readable.pipe(res); // <-- Streaming with 'pipe()' function
    // readable(destination).pipe()  -> into (writeableDestination); /'pipe()'- solved problem with backPressure/
 });

 server.listen(8000, '127.0.0.1', () => {
     console.log('Server litening ...');
 });