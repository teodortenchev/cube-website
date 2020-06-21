const Cube = require('../models/cube');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    console.log(cubes);
    return cubes;
}

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean();
    return cube;
}

module.exports = {
    getAllCubes,
    getCube
}