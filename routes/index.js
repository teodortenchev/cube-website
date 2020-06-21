// TODO: Require Controllers...
const { Router } = require('express');
const router = Router();
const { getAllCubes, getCube } = require('../controllers/cubes');
const Cube = require('../models/cube');

router.get('/', async (req, res) => {

    const cubes = await getAllCubes();
    res.render('index', {
        title: 'Cube Workshop',
        cubes
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

    const cube = new Cube({ name, description, imageUrl, difficulty: difficultyLevel });

    cube.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

router.get('/details/:id', async (req, res) => {

    const cube = await getCube(req.param.id);

    res.render('details', {
        title: 'Details',
        ...cube
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR'
    });
})


module.exports = router;