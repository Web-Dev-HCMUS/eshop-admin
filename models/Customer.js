const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Customer = new Schema({
    username: { type : String , required: true },
    password: { type : String },
    email: { type : String },
    fullname: { type : String },
    address: { type : String },
    phone: { type : String },
    status: { type : Boolean }
});

//collection name, with SINGULAR NOUN and name on the database will be the PLURAL NOUN
module.exports = mongoose.model('user', Customer);