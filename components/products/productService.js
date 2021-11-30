const Product = require('../../models/Product');
const Category = require('../../models/Category')

exports.list = () => Product.find({});

exports.oneProduct = (slug) => Product.findOne({slug:slug});

exports.categories = () => Category.find({});