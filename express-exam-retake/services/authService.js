const User = require("../schemes/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { SALT_ROUNDS, JWT_LOGIN_SECRET } = require("../config");


async function register(registerData) {
    if (!registerData.username || !registerData.password || !registerData.name) {
        throw { message: "All fields are required" }
    }

    if (registerData.password.length < 3) {
        throw { message: "Password should be at least 3 characters long" }
    }

    if (registerData.rePass !== registerData.password) {
        throw { message: "Password and Repeat Password must be identical!" }
    }

    let user = await User.findOne({ username: registerData.username });

    if (user) {
        throw { message: "This username exist" }
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(registerData.password.trim(), salt);
    const userObj = new User({name: registerData.name.trim(), username: registerData.username.trim(), password: hash});
    return userObj.save()
}

async function login(loginData){
    if (!loginData.username || !loginData.password) {
        throw { message: "All fields are requred" }
    }

    if (loginData.password.length < 3) {
        throw { message: "Password should be at least 3 characters long" }
    }

    let user = await User.findOne({ username: loginData.username });

    if (!user) {
        throw { message: "Incorrect username or password!" }
    }

    const match = await bcrypt.compare(loginData.password.trim(), user.password)

    if(!match){
        throw { message: "Incorrect username or password!" }
    } 
    return jwt.sign({"_id": user._id, username: user.username}, JWT_LOGIN_SECRET);
}

async function findUserWithId(id){
    return User.findOne({ _id: id });
}

module.exports = {
    register,
    login,
    findUserWithId,
}