const { Router } = require('express');
const router = Router();
const { saveUser, verifyUser } = require('../controllers/user');

router.get('/login', (req, res) => {
    res.render('user/login', {
        title: 'Log In'
    });
})

router.post('/login', async (req, res) => {
    
    const status = await verifyUser(req, res);

    if(status) {
        return res.redirect('/');
    }

    res.redirect('/user/login');
})


router.get('/register', (req, res) => {
    res.render('user/register', {
        title: 'Register'
    });
})

router.post('/register', async (req, res) => {
    
    const status = await saveUser(req, res);

    if(status) {
        return res.redirect('/');
    }

    res.redirect('/user/register');
})




router.get('/logout', (req, res) => {

    //TODO
})

module.exports = router;
