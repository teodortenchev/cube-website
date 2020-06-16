// TODO: Require Controllers...
const { Router } = require('express');
const router = Router();
const { getAllCubes } = require('../controllers/cubes');
const { getCube } = require('../controllers/database');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube Workshop',
        cubes: getAllCubes()
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

router.get('/details/:id', (req, res) => {
    
    const cube = getCube(req.params.id);
    
    res.render('details', {
        title: 'Details ~ Cube Workshop',
        ...cube
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR'
    });
})


module.exports = router;