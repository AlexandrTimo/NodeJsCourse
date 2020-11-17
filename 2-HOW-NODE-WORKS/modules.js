/* console.log(arguments);
console.log(require('module').wrapper); // <-- Wraping function
 */

// module.exports -->
const Calculator = require ('./test-module-1');

const newC1 = new Calculator();
console.log(newC1.multiply(4,7));


// exports -->
/* const newC2 = require('./test-module-2');  
console.log(newC2.multiply(4,7)); */

const { add, multiply, devide } = require('./test-module-2');
console.log(multiply(4,7));

// caching -->
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

// output -->
/*  28
    28
    Hello from module-3!
    This is log of export.
    This is log of export.
    This is log of export. 
*/
