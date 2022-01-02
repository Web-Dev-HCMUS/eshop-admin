const Admin = require('../../models/Admin')
const bcrypt = require("bcrypt");

const perPage = 5;

exports.findAdminById = (id) => Admin.findOne({_id: id}).lean();

exports.updateOneFromDatabase = async (req) => {
    await Admin.updateOne({_id:req.params._id}, req.body);
}

exports.updatePassword = async (req) => {
    const user = await Admin.findById({_id:req.params._id}).lean();
    const isMatch = await bcrypt.compare(req.body['old-password'],user.password);
    if(!isMatch){
        console.log("Wrong password")
        return false;
    } else{
        if(req.body['new-password'] !== req.body['repeat-new-password']){
            return false;
        } else{
            const passwordHash = await bcrypt.hash(req.body['new-password'], 10);
            await Admin.updateOne({_id:req.params._id}, { $set: { password:passwordHash}});
            return true;
        }
    }
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