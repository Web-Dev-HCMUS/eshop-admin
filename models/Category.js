const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
    type: {type: String}
},{timestamps: true});

//collection name, with SINGULAR NOUN and name on the database will be the PLURAL NOUN
module.exports = mongoose.model('Category', Category, 'categories');