const { Router } = require('express');
const router = Router();
const { getAllCubes, getCube, updateCube, getCubeWithAccessories, deleteCube, editCube } = require('../controllers/cubes');
const { getAllAccessories } = require('../controllers/accessories')
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');
const { getDifficultyString } = require('../helpers/cubeDifficulty');
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    const cubes = await getAllCubes();
    res.render('index', {
        title: 'Cube Workshop',
        cubes,
        dbHasCubes: cubes.length > 0
    });
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ~ Cube Workshop'

    });
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create ~ Cube Workshop'
    });
})

router.post('/create', (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['uid'];
    const decodedObject = jwt.verify(token, 'SampleKey'); //I wouldn't do that normally, key should never be shared anywhere.

    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel, creatorId: decodedObject.userId });

    cube.save((err) => {
        if (err) {
            console.log(err);
            res.redirect('/create')
        } else {
            res.redirect('/');
        }
    });
});

router.get('/details/:id', async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('details', {
        title: 'Details',
        ...cube,
        hasAccessories: cube.accessories.length > 0
    })
})

router.get('/delete/:id', async (req, res) => {
    const cube = await getCube(req.params.id);

    res.render('delete', {
        title: `Delete Cube ~ ${cube.name}`,
        cubeDifficulty: getDifficultyString(cube.difficulty),
        ...cube
    })
})

router.post('/delete/:id', async (req, res) => {

    await deleteCube(req.params.id);

    res.redirect('/');
})

router.get('/edit/:id', async (req, res) => {
    const cube = await getCube(req.params.id);

    res.render('edit', {
        title: `Edit ~ ${cube.name}`,
        ...cube,
    })
})

router.post('/edit/:id', async (req, res) => {
    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    await editCube(req.params.id, name, description, imageUrl, difficultyLevel);

    res.redirect(`/details/${req.params.id}`);

})

router.get('/create/accessory', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory ~ Cube Workshop'
    });
})

router.post('/create/accessory', (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    const accessory = new Accessory({ name, description, imageUrl });

    accessory.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
})

router.get('/attach/accessory/:id', async (req, res) => {

    const cube = await getCube(req.params.id);
    const accessories = await getAllAccessories();

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        ...cube,
        accessories,
        hasAllAccessories: cube.accessories.length === accessories.length
    })
})

router.post('/attach/accessory/:id', async (req, res) => {
    const { accessoryId } = req.body;

    await updateCube(req.params.id, accessoryId)
    const accessories = await getAllAccessories();

    res.redirect(`/details/${req.params.id}`);
})

module.exports = router;
