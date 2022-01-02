const Customer = require('../../models/Customer')

const perPage = 5;

exports.findCustomerById = (id) => Customer.findOne({_id: id}).lean();

exports.findCustomerByUsername = (username) => Customer.findOne({username: username}).lean();

exports.list = (page) => Customer.find({}, null,{ skip: perPage * (page-1) }).limit(perPage);

exports.countDoc = () => Customer.find({}).count();

exports.updateOneFromDatabase = (req) =>
    Customer.updateOne({_id:req.params._id}, { $set: { status: req.query.status }});