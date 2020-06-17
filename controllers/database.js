const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '..', '/config/database.json');

const saveCube = (cube, callback) => {
    getCubes((cubes) => {
        cubes.push(cube);
        fs.writeFile(dbFilePath, JSON.stringify(cubes), (err) => {
            if (err) {
                throw err;
            }
            console.log('New cube is successfully stored.');
            callback();
        })
    })


}

const getCube = (id, callback) => {
    getCubes(cubes => {
        const cube = cubes.filter(c => c.id === id)[0];
        callback(cube);
    })
}

const getCubes = (callback) => {
    fs.readFile(dbFilePath, (err, dbData) => {
        if(err){
            throw err;
        }
        const cubes = JSON.parse(dbData);
        callback(cubes);
    })
}


module.exports = {
    getCube,
    getCubes,
    saveCube
}