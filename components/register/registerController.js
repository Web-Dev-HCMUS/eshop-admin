const registerService = require('../register/registerService')

exports.register = async function(req, res, next){
    res.render('../components/register/views/register');
};

exports.restoreRegister = async function(req, res, next){
    await registerService.model(req.body);
    res.redirect('../components/register/views/register', {success:'Register success!'});
};