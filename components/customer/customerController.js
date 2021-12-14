const customerService = require('./customerService');
const mongooseObject = require("../../ulti/mongoose");

exports.list = async (req, res, next) => {
    const totalDoc = await customerService.countDoc();
    const totalPage = Math.ceil(totalDoc / 5);

    const customers = await customerService.list(req.query.page || 1);

    res.render('../components/customer/views/customerList', {
        customers: mongooseObject.multipleMongooseToObject(customers),
        totalPage: totalPage
    });
}

exports.setStatus = async (req, res, next) => {
    await customerService.updateOneFromDatabase(req);
    res.redirect(req.query.redirect);
}

exports.show = async (req, res, next) => {
    const customerId = req.params._id? req.params._id : req.user._id;

    const customer = await customerService.findCustomerById(customerId);

    res.render('../components/customer/views/profile', {
        customer: customer,
    });
}