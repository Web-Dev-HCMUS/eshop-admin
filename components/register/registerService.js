const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt');

exports.model = async (user) => {
    const isExist = await Admin.findOne({username: user.username});
    if(isExist){
        return false;
    }
    const passwordHash = await bcrypt.hash(user.password, 10);
    return Admin.create({
        username: user.username,
        password: passwordHash,
        email: user.email,
        fullname: user.fullname,
        address: user.address,
        phone: user.phone,
        level: user.level
    })
}
