const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt')

exports.findByUsername = (username) => Admin.findOne({username: username}).lean();

exports.validPassword = (password, user) => {
    return bcrypt.compare(password,user.password);
};
