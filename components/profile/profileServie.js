const Admin = require('../../models/Admin')
const bcrypt = require("bcrypt");

const perPage = 5;

exports.findAdminById = (id) => Admin.findOne({_id: id}).lean();

exports.updateOneFromDatabase = async (req) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    await Admin.updateOne({_id:req.params._id}, req.body);
}

exports.deleteOutOfDatabase = (req) => Admin.deleteOne({_id:req.params._id});

exports.list = (page) => Admin.find({}, null,{ skip: perPage * (page-1) }).limit(perPage);

exports.countDoc = () => Admin.find({}).count();

exports.searchProfile = async (req, page) => {
    const totalDoc = await Admin.find({
        username: {$regex: new RegExp(req.query.q, "ig")}
    }).count();

    const result = await Admin.find({
        username: {$regex: new RegExp(req.query.q, "ig")}
    }).skip(perPage * (page-1)).limit(perPage);

    return {
        totalDoc: totalDoc,
        result: result,
        perPage: perPage
    }
};