const EventEmitter = require ('events'); // <-- Connect 'events' module as 'class'
const http = require ('http'); // <-- Connect 'http' module as object


// --------------------------------------------------------------------------------------
// Exmaple of custom Listener

class Sales extends EventEmitter {
    constructor(){
        super();
    }
};

const myEmitter = new Sales(); // <-- Create new 'object'(event) from 'class EventEmitter'

myEmitter.on('newSale', () =>{  // <-- Create new listener  
    console.log('There was a new Sale');  // <-- Attached 'Call back Function'
});

myEmitter.on('newSale', () => {  // <-- Create new listener  
    console.log('Costumer name: Alexander');  // <-- Attached 'Call back Function'
});

myEmitter.on('newSale', stock => {
    console.log(`So, here we have ${stock} stocks for sale.`);
});

myEmitter.emit('newSale', 8); //  <-- Calling 'Event Emitter' with name 'newSale'


// --------------------------------------------------------------------------------------
// Exmaple of module Listener

const server = http.createServer(); 

server.on('request', (req, res) => {    // <-- Create new listener
    console.log(req.url)
    console.log('Request recieved!');   // <-- Attached 'Call back Function'
    //res.end('Requset recieved!');
});
server.on('request', (req, res) => {    // <-- Create new listener
    console.log('Another request:)))'); // <-- Attached 'Call back Function'
    res.end('Requset recieved twice!'); // <-- Respond to http
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening...');
});