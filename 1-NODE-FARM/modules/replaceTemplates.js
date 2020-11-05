// Function for replace templates (Ex.{%PRICE%})

module.exports = (temp, product) => {  // <-- temp - 'html file' / product - 'json list'
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};