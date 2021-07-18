const User = require('../models/User');

async function createUser(userData) {

    const user = new User(userData)
    await user.save()
    return user
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i')
    return User.findOne({
        email: { $regex: pattern }
    });
}

module.exports = {
    createUser,
    getUserByEmail
}