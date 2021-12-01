const Product = require('../../models/Product');
const Category = require('../../models/Category')

exports.list = (page) => Product.find({}, null,{ skip: 5 * (page-1) }).limit(5);

exports.countDoc = () => Product.find({}).count();

exports.oneProduct = (slug) => Product.findOne({slug:slug});

exports.categories = () => Category.find({});

exports.updateOneFromDatabase = (req) => Product.updateOne({_id:req.params.id}, req.body);

exports.storeToDatabase = async (req) => {
    const product = new Product(req.body);
    await product.save();
};

exports.deleteOutOfDatabase = (req) => Product.deleteOne({_id:req.params.id});

exports.searchProduct = (req) => Product.find({name:{
    $regex: new RegExp(req.query.q, "ig")
}});