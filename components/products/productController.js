const productService = require('./productService');
const mongooseObject = require('../../ulti/mongoose');

exports.list = async function(req, res, next){
    const products = await productService.list();

    res.render('products', { products: mongooseObject.multipleMongooseToObject(products) });
};

exports.detail = async function(req, res, next){
    const product = await productService.oneProduct(req.params.slug);
    const category = await productService.categories();

     res.render('detail', {
        product: mongooseObject.mongooseToObject(product),
        category: mongooseObject.multipleMongooseToObject(category)
    });
};

exports.add = function(req, res, next){
    productService.add(req).then(() => res.redirect('/products'))
        .catch(next);
}

exports.create = async function(req, res, next){
    const category = await productService.categories();
    res.render('addProduct', {category: mongooseObject.multipleMongooseToObject(category)});
};

exports.update = async function(req, res, next){
    await productService.update(req).then(() => res.redirect('/products'))
                                .catch(next);
};

exports.delete = async function(req, res){

};