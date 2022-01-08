const productService = require('./productService');
const mongooseObject = require('../../ulti/mongoose');
const Product = require("../../models/Product");

const perPage = 9;

exports.list = async function(req, res, next){
    const totalDoc = await productService.countDoc();
    const totalPage = Math.ceil(totalDoc / perPage);

    const products = await productService.list(req.query.page || 1);

    res.render('../components/products/views/products', {
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
    res.render('../components/products/views/add', {category: mongooseObject.multipleMongooseToObject(category)});
};

exports.store = async function(req, res, next){
    await productService.storeToDatabase(req);
    res.redirect('/products');
};

exports.edit = async function(req, res, next){
    const product = await productService.findOneProductById(req.params._id);
    const category = await productService.categories();

    const updateSuccess = req.query.success !== undefined;

    res.render('../components/products/views/edit', {
        product: mongooseObject.mongooseToObject(product),
        category: mongooseObject.multipleMongooseToObject(category),
        updateSuccess
    });
};

exports.update = function(req, res, next){
    const product = {
        ... req.body,
        _id: req.params._id}

    productService.updateOneFromDatabase(req)
        .then(() => {
            res.redirect(`/products/${product._id}/edit?success`)
        })
        .catch(next);
};

exports.delete = function(req, res, next){
    productService.deleteOutOfDatabase(req)
        .then(() => res.redirect(req.query.redirect))
        .catch(next);
};

exports.search = async function(req, res, next){
    const {totalDoc, result, perPage} = await productService.searchProduct(req, req.query.page || 1);

    res.render('../components/products/views/products', {
        products: mongooseObject.multipleMongooseToObject(result),
        totalPage: Math.ceil(totalDoc / perPage),
        queryName: req.query.name,
        page: {
            num: req.query.page || 1,
            perPage: perPage
        }
    });
};