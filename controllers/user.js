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

module.exports = {
    saveUser,
    verifyUser
}