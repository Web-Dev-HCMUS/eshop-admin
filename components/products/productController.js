const productService = require('./productService');
const mongooseObject = require('../../ulti/mongoose');

exports.list = async function(req, res){
    const products = await productService.list();

    res.render('products', { products: mongooseObject.multipleMongooseToObject(products) });
};

exports.oneProduct = async function(req, res){
    const product = await productService.oneProduct(req.params.slug);

    res.render('detail', { product: mongooseObject.mongooseToObject(product) });
};