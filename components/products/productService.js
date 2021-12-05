const Product = require('../../models/Product');
const Category = require('../../models/Category')

const perPage = 5;

exports.list = (page) => Product.find({}, null,{ skip: 5 * (page-1) }).limit(5);

exports.countDoc = () => Product.find({}).count();

exports.oneProduct = (slug) => Product.findOne({slug:slug});

exports.findOneProductById = (id) => Product.findOne({_id:id});

exports.categories = () => Category.find({});

exports.updateOneFromDatabase = (req) => Product.updateOne({_id:req.params._id}, req.body);

exports.storeToDatabase = async (req) => {
    const product = new Product(req.body);
    await product.save();
};

exports.deleteOutOfDatabase = (req) => Product.deleteOne({_id:req.params._id});

exports.searchProduct = async (req, page) => {
    const totalDoc = await Product.find({
    name: {$regex: new RegExp(req.query.name, "ig")}
    }).count();

    const result = await Product.find({
        name: {$regex: new RegExp(req.query.name, "ig")}
    }).skip(5 * (page-1)).limit(5);

    return {
        totalDoc: totalDoc,
        result: result,
        perPage: perPage
    }
};