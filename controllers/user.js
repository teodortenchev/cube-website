const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const privateKey = 'SampleKey';

const generateToken = data => {
    const token = jwt.sign(data, privateKey);

    return token;
}

const saveUser = async (req, res) => {
    const {
        username,
        password,
        repeatPassword
    } = req.body;

    if (password !== repeatPassword) {
        return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hashedPassword
    })

    const userObject = await user.save();

    const token = generateToken({
        userId: userObject._id,
        username: userObject.username
    });

    res.cookie('uid', token);

    return true;
};

const verifyUser = async (req, res) => {

    const {
        username,
        password
    } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return false;
    }

    const status = bcrypt.compare(password, user.password);



    if (status) {
        const token = generateToken({
            userId: user._id,
            username: user.username
        });

        res.cookie('uid', token);
    }

    return status;
}

const isAuthenticated = (req, res, next) => {

    const token = req.cookies['uid'];

    if (!token) {
        return res.redirect('/');
    }

    try {
        const decodedObject = jwt.verify(token, privateKey);
        next();
    } catch (e) {
        return res.redirect('/');
    }
}

const isGuest = (req, res, next) => {

    const token = req.cookies['uid'];

    if (token) {
        return res.redirect('/');
    }

    next();
}

const getUserStatus = (req, res, next) => {
    const token = req.cookies['uid'];

    if (!token) {
        req.isLoggedIn = false;
    }

    try {
        jwt.verify(token, privateKey);
        req.isLoggedIn = true;
    } catch (e) {
        req.isLoggedIn = false;
    }

    next();
}

const isCubeCreator = (cubeUserId, req) => {
    const token = req.cookies['uid'];

    if (token) {
        const decodedObject = jwt.verify(token, privateKey);
        const userId = decodedObject.userId;

        if (userId == cubeUserId) {
            return true;
        }
    }

    return false;
}


module.exports = {
    saveUser,
    verifyUser,
    isAuthenticated,
    getUserStatus,
    isGuest,
    isCubeCreator
}
