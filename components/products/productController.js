const productService = require('./productService');
const mongooseObject = require('../../ulti/mongoose');
const Product = require("../../models/Product");

exports.list = async function(req, res, next){
    const totalDoc = await productService.countDoc();
    const totalPage = Math.ceil(totalDoc / 5);

    const products = await productService.list(req.query.page || 1);

    res.render('products', {
        products: mongooseObject.multipleMongooseToObject(products),
        totalPage: totalPage
    });
};

exports.detail = async function(req, res, next){
    const product = await productService.oneProduct(req.params.slug);
    const category = await productService.categories();

     res.render('detail', {
        product: mongooseObject.mongooseToObject(product),
        category: mongooseObject.multipleMongooseToObject(category)
    });
};

exports.create = async function(req, res, next){
    const category = await productService.categories();
    res.render('addProduct', {category: mongooseObject.multipleMongooseToObject(category)});
};

exports.store = function(req, res, next){
    productService.storeToDatabase(req).then(() => res.redirect('/products'))
                            .catch(next);
};

exports.edit = function(req, res, next){
    res.send("edit");
};

exports.update = function(req, res, next){
    productService.updateOneFromDatabase(req).then(() => res.redirect('/products'))
                                .catch(next);
};

exports.delete = function(req, res, next){
    productService.deleteOutOfDatabase(req).then(() => res.redirect('/products'))
                                .catch(next);
};

exports.search = async function(req, res, next){
    const {totalDoc, result, perPage} = await productService.searchProduct(req, req.query.page || 1);

    res.render('products', {
        products: mongooseObject.multipleMongooseToObject(result),
        totalPage: Math.ceil(totalDoc / 5),
        queryName: req.query.name,
        page: {
            num: req.query.page || 1,
            perPage: perPage
        }
    });
};