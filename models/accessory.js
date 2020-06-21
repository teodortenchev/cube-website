const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    imageUrl: {
        type: String,
        required: true,
        //TO DO: Custom validation for https
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
    
});

module.exports = mongoose.model('Accessory', AccessorySchema);