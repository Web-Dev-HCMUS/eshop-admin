const Admin = require('../../models/Admin')

const perPage = 5;

exports.findAdminById = (id) => Admin.findOne({_id: id}).lean();

exports.updateOneFromDatabase = (req) => Admin.updateOne({_id:req.params._id}, req.body);

exports.deleteOutOfDatabase = (req) => Admin.deleteOne({_id:req.params._id});

exports.list = (page) => Admin.find({}, null,{ skip: 5 * (page-1) }).limit(5);

exports.countDoc = () => Admin.find({}).count();

exports.searchProfile = async (req, page) => {
    const totalDoc = await Admin.find({
        username: {$regex: new RegExp(req.query.q, "ig")}
    }).count();

    const result = await Admin.find({
        username: {$regex: new RegExp(req.query.q, "ig")}
    }).skip(5 * (page-1)).limit(5);

    return {
        totalDoc: totalDoc,
        result: result,
        perPage: perPage
    }
};