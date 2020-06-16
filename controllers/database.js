const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '..', '/config/database.json');



const saveCube = (cube) => {
    const cubes = getCubes();
    cubes.push(cube);
    
    fs.writeFile(dbFilePath, JSON.stringify(cubes), (err) => {
        if (err) {
            throw err;
        }
        console.log('New cube is successfully stored.');
    })
}

const getCube = id => {
    const cube = getCubes().filter(c => c.id === id)[0];
    return cube;
}

const getCubes = () => {
    const cubes = fs.readFileSync(dbFilePath);
    return JSON.parse(cubes);
}


module.exports = {
    getCube,
    getCubes,
    saveCube
}