const registerService = require('../register/registerService')

exports.register = async function(req, res, next){
    const createSuccess = req.query['create-success'] !== undefined;
    const usernameExist = req.query['username-exist'] !== undefined;

    res.render('../components/register/views/register', {createSuccess, usernameExist});
};

exports.restoreRegister = async function(req, res, next){
    const success = await registerService.model(req.body);

    if(success === false){
        res.redirect(`/register?username-exist`);
    } else{
        res.redirect(`/register?create-success`);
    }
};