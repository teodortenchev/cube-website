const { v4 } = require('uuid');            //destructuring
const { saveCube } = require('../controllers/database');

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.id = v4();
        this.name = name || "No Name";
        this.description = description || "No description available.";
        this.imageUrl = imageUrl || "placeholder";
        this.difficulty = difficulty || 0;
    }

    // saveCube
    save(callback) {

        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        };

        saveCube(newCube, callback);

    }
}

module.exports = Cube;