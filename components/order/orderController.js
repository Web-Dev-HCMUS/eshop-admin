const orderService = require('./orderService');
const mongooseObject = require('../../ulti/mongoose');
const Cart = require("../../models/Cart");

exports.getCart = async function(req, res, next){
    const totalDoc = await orderService.countDoc();
    const totalPage = Math.ceil(totalDoc / 5);

    const carts = await orderService.getCart(req.query.page || 1);

    res.render('../components/order/views/cart', {
        carts: carts,
        totalPage: totalPage
    });
};

exports.showOrder = async function(req, res, next){
    const order = await orderService.showOrder(req.params._id);

    res.render('../components/order/views/viewOrder', {order});
};

exports.updateStatus = async function(req, res, next){
    await orderService.updateOneFromDatabase(req);
    res.status(200);
};

exports.cancelOrder = async function(req, res, next){
    //await orderService.cancelOrder(req);
    console.log("dsadadsa")
    res.redirect('/');
}