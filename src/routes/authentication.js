const express = require("express");
const router = express.Router();
//const passport =require('../lib/passport');//trae  el modo para autentitcicon
const passport = require('passport');

router.get('/signup',(req,res)=>{
    res.render('auth/signup');
});
router.post('/signup', async (req,res)=>{
    //console.log(req.body);
    //utilizaremos passport 
    //const { fullname, username, password} = req.body;
    passport.authenticate('local.signup',{
        successRedirect: '/profile', //si todo sale bien redireccionalo a profle
        failureRedirect: 'signup',//formulario
        failureFlash: true
    });

    res.send('resivido');
});

router.get('/profile',(req, res)=>{

    res.send("Profile");
});

module.exports = router;
