const Product = require('../../models/Product');
const Category = require('../../models/Category')

exports.list = () => Product.find({});

exports.oneProduct = (slug) => Product.findOne({slug:slug});

exports.categories = () => Category.find({});

exports.update = (req) => Product.updateOne({_id:req.params.id}, req.body);

exports.add = async (req) => {
    const product = new Product(req.body);
    console.log(product);
    await Product.create({ product });
};
