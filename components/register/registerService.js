const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt')

exports.model = async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    return Admin.create({
        username: user.username,
        email: user.email,
        password: passwordHash,
        address: user.address,
        phone: user.phone,
        level: user.level
    })
}