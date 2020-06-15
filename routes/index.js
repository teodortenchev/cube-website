// TODO: Require Controllers...
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Cube Workshop'
    });
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ~ Cube Workshop'

    });
})

router.get('/create', (req, res) => {
    res.render('create',{
        title: 'Create ~ Cube Workshop'

    });
})


router.get('*', (req, res) => {
    res.render('404',{
        title: 'ERROR'
    });
})


module.exports = router;