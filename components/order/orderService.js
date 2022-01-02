const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

const perPage = 5;

exports.list = (page) => Product.find({}, null,{ skip: 5 * (page-1) }).limit(5);

exports.getCart = async (page) => {
    const result = await Cart.find({}, null,{ skip: perPage * (page-1) }).limit(perPage);

    let carts = [];
    for(let i=0; i<result.length; i++) {
        const date = new Date(result[i].createdAt);  // dateStr you get from mongodb
        const date_str = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

        carts.push({
            _id: result[i]._id,
            username: result[i].username,
            orderTotal: result[i].orderTotal,
            status: result[i].status,
            createdAt: date_str
        });

    }

    return carts;
};

exports.showOrder = async (id) => {
    const result = await Cart.findOne({_id: id}).lean();
    let cart = [];

    for (let j = 0; j < result.products.length; j++) {
        const product = await Product.findById({_id: result.products[j]._id}).lean();
        cart.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: result.products[j].quantity,
            totalPrice: result.products[j].totalPrice,
            image: product.image[0],
            slug: product.slug
        });
    }

    return {
        ...
        result,
        products: cart
    };
};

exports.countDoc = async () => await Cart.find({}).count();

exports.updateOneFromDatabase = (req) => Cart.updateOne({_id:req.params._id},
                                                        { $set: { status: req.query.status }});

exports.cancelOrder = async (req) => await Cart.deleteOne({_id:req.params._id});
