const Cube = require('../models/cube');
const { isValidObjectId } = require('mongoose');

const getAllCubes = async () => {
    const cubes = await Cube.find().lean();
    return cubes;
};

const getCube = async (id) => {
    const cube = await Cube.findById(id).lean();
    return cube;
};

const getCubeWithAccessories = async (id) => {
    const cube = await Cube.findById(id).populate({
        path: 'accessories',
        populate: { path: 'accessories' }
    }).lean();
    return cube;
};

const updateCube = async (cubeId, accessoryId) => {
    await Cube.findByIdAndUpdate(cubeId, {
        $addToSet: {
            accessories: [accessoryId]
        }
    })


}

const editCube = async (cubeId, name, description, imageUrl, difficulty) => {
    
    const cube = await getCube(cubeId);

    await Cube.findByIdAndUpdate(cube._id, {
        name: name,
        description: description,
        imageUrl: imageUrl,
        difficulty: difficulty
    });
}


const deleteCube = async (cubeId) => {
    
    const cube = await getCube(cubeId);

    await Cube.deleteOne(cube._id);
}

module.exports = {
    getAllCubes,
    getCube,
    updateCube,
    getCubeWithAccessories,
    deleteCube,
    editCube
};
