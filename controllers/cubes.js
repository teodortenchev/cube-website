const { getCubes } = require('./database');

<<<<<<< Updated upstream

const getAllCubes = (callback) => {
    getCubes((cubes) => {
        callback(cubes)
    })
=======
const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    return cubes;
}

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean();
    console.log(`Cube with id ${id}: `, cube)
    return cube;
>>>>>>> Stashed changes
}

module.exports = {
    getAllCubes
}