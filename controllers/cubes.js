const Cube = require('../models/cube');

<<<<<<< HEAD
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
=======
const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    console.log(cubes);
    return cubes;
}

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean();
    return cube;
>>>>>>> 73f88cc0fe4606009270716c41fa72b1c1b7b93a
}

module.exports = {
    getAllCubes,
    getCube
}