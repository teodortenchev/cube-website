const Accessory = require('../models/accessory');

const getAllAccessories = async () => {
    const accessories = await Accessory.find().lean();
    return accessories;
};

module.exports = {
    getAllAccessories
};