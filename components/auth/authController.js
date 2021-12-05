exports.login = async function(req, res, next){
    const wrongPassword = req.query['wrong-password'] !== undefined;
    res.render('../components/auth/views/login', {layout: false, wrongPassword});
};

exports.logout = async function(req, res, next){
    req.logout();
    res.redirect('/auth/login');
};