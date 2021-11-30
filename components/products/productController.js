const productService = require('./productService');
const mongooseObject = require('../../ulti/mongoose');

exports.list = async function(req, res){
    const products = await productService.list();

    res.render('products', { products: mongooseObject.multipleMongooseToObject(products) });
};

exports.detail = async function(req, res){
    const product = await productService.oneProduct(req.params.slug);
    const category = await productService.categories();

     res.render('detail', {
        product: mongooseObject.mongooseToObject(product),
        category: mongooseObject.multipleMongooseToObject(category)
    });
};

exports.create = async function(req, res){

}

exports.add = async function(req, res){

};

exports.update = async function(req, res){

};

exports.delete = async function(req, res){

};