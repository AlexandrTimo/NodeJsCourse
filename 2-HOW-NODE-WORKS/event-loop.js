const fs = require ('fs'); // <-- Require Module
const crypto = require ('crypto'); // <-- Require Module

const start = Date.now(); // <-- Top-lvl code
process.env.UV_THREADPOOL_SIZE = 4;  // <-- Change number of thread pools (Top-lvl code)

fs.readFile('test-file.txt', () => { // <-- Event Loop
    console.log('I/O finished'); // <-- Top-lvl code
    console.log('------------------------------');

    setTimeout(() => console.log('Timer 1 finished'), 0); // <-- PHASE 1 (paused)
    setTimeout(() => console.log('Timer 2 finished'), 3000);
    setImmediate(() => console.log('Immediate 2 finished')); // <-- PHASE 3

    
    process.nextTick(() => console.log('Process NextTick')); // <-- Get tick after 'fs.readFile()'process of PHASE 2 will finished

    
    crypto.pbkdf2('password', 'sugar', 100000, 1024, 'sha512', () =>{ // <-- Huge proccess going via 'Tread Pool'
        console.log(Date.now() - start, 'Password encypted');
    });
    crypto.pbkdf2('password', 'sugar', 100000, 1024, 'sha512', () =>{ // <-- Huge proccess going via 'Tread Pool'
        console.log(Date.now() - start, 'Password encypted');
    });
    crypto.pbkdf2('password', 'sugar', 100000, 1024, 'sha512', () =>{ // <-- Huge proccess going via 'Tread Pool'
        console.log(Date.now() - start, 'Password encypted');
    });
    crypto.pbkdf2('password', 'sugar', 100000, 1024, 'sha512', () =>{ // <-- Huge proccess going via 'Tread Pool'
        console.log(Date.now() - start, 'Password encypted');
    });
});

console.log('Hello from the top-lvl code'); // <-- Top-lvl code