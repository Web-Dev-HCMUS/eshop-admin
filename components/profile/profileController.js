const profileService = require('./profileServie');
const mongooseObject = require("../../ulti/mongoose");

exports.show = async (req, res, next) => {
    const adminId = req.params._id? req.params._id : req.user._id;

    const admin = await profileService.findAdminById(adminId);

    const updateSuccess = req.query['update-success'] !== undefined;

    res.render('../components/profile/views/profile', {
        admin: admin,
        updateSuccess
    });
}

exports.update = async (req, res, next) => {
    await profileService.updateOneFromDatabase(req)
        .then(() => {res.redirect(`/account/${req.params._id}?update-success`)})
        .catch(next);
}

exports.delete = function(req, res, next){
    profileService.deleteOutOfDatabase(req).then(() => res.redirect(req.query.redirect))
        .catch(next);
};

exports.list = async (req, res, next) => {
    const totalDoc = await profileService.countDoc();
    const totalPage = Math.ceil(totalDoc / 5);

    const admins = await profileService.list(req.query.page || 1);

    res.render('../components/profile/views/profileList', {
        admins: mongooseObject.multipleMongooseToObject(admins),
        totalPage: totalPage
    });
}

exports.search = async function(req, res, next){
    const {totalDoc, result, perPage} = await profileService.searchProfile(req, req.query.page || 1);

    res.render('../components/profile/views/profileList', {
        admins: mongooseObject.multipleMongooseToObject(result),
        totalPage: Math.ceil(totalDoc / 5),
        queryName: req.query.name,
        page: {
            num: req.query.page || 1,
            perPage: perPage
        }
    });
};
