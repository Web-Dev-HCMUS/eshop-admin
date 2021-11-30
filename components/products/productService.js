const Product = require('../../models/Product');

exports.list = () => Product.find({});

exports.oneProduct = (slug) => Product.findOne({slug:slug});