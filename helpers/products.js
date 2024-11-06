module.exports.getPriceNew = (product) => {
   
    if(!product.discountPercentage){
        return product.price
    }
    
    const priceNew = (product.price - product.price * (product.discountPercentage)/100).toFixed(1);
    return priceNew
}