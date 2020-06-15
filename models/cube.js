const { v4 } = require('uuid');            //destructuring
const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, '..', '/config/database.json');
 
 class Cube {
     constructor(name, description, imageUrl, difficulty) {
         this.id = v4();
         this.name = name || "No Name";
         this.description = description || "No description available.";
         this.ImageUrl = imageUrl || "placeholder";
         this.difficulty = difficulty || 0;
     }

     // saveCube
     save() {

        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        };

        fs.readFile(dbFilePath, (err, dbData) => {
            if (err) {
                throw err;
            }
            
            const cubes = JSON.parse(dbData);

            cubes.push(newCube);

            fs.writeFile(dbFilePath, JSON.stringify(cubes), (err) => {
                if (err) {
                    throw err;
                }
                console.log('New cube is successfully stored.');
            })
        })

        
     }
 }


 module.exports = Cube;