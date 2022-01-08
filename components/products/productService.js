const Product = require('../../models/Product');
const Category = require('../../models/Category')

const perPage = 9;

exports.list = (page) => Product.find({}, null,{ skip: perPage * (page-1) }).limit(perPage);

exports.countDoc = () => Product.find({}).count();

exports.oneProduct = (slug) => Product.findOne({slug:slug});

exports.findOneProductById = (id) => Product.findOne({_id:id});

exports.categories = () => Category.find({});

exports.updateOneFromDatabase = (req) => Product.updateOne({_id:req.params._id}, req.body);

exports.storeToDatabase = async (req) => {
    await Product.create({
        ...
        req.body,
        sold: 0
    });
};

exports.deleteOutOfDatabase = (req) => Product.deleteOne({_id:req.params._id});

exports.searchProduct = async (req, page) => {
    const totalDoc = await Product.find({
    name: {$regex: new RegExp(req.query.name, "ig")}
    }).count();

    const result = await Product.find({
        name: {$regex: new RegExp(req.query.name, "ig")}
    }).skip(perPage * (page-1)).limit(perPage);

    return {
        totalDoc: totalDoc,
        result: result,
        perPage: perPage
    }
};