const homeService = require('./homeService');
const mongooseObject = require('../../ulti/mongoose');
const Product = require('../../models/Product');

exports.list = async function(req, res){
    res.render('home');
};