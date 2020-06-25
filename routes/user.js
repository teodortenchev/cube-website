const { Router } = require('express');
const router = Router();

router.get('/login', (req, res) => {  
    res.render('user/login', {
        title: 'Log In'
    });
})

router.get('/register', (req, res) => {
    res.render('user/register', {
        title: 'Register'
    });
})

router.get('/logout', (req, res) => {
    
    //TODO
})

module.exports = router;
