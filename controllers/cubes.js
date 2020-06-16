const { getCubes } = require('./database');


const getAllCubes = () => {
    return getCubes();
}

module.exports = {
    getAllCubes
}