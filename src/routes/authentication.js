const express = require("express");
const router = express.Router();
//const passport =require('../lib/passport');//trae  el modo para autentitcicon
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn} =require('../lib/auth'); //ruta para proteger las rutas 

router.get('/signup',isNotLoggedIn,(req,res)=>{
    res.render('auth/signup');
});

// router.post('/signup', async (req,res)=>{
//     //console.log(req.body);
//     //utilizaremos passport 
//     //const { fullname, username, password} = req.body;
//     passport.authenticate('local.signup',{ //nombre de la autenticacion
//         successRedirect: '/profile', //si todo sale bien redireccionalo a profle
//         failureRedirect: 'signup',//formulario
//         failureFlash: true
//     });

//     res.send('resivido');
// });


//este viaja a a  a passport que esta en lib  y se ejecuta en el console.lod de req.body
router.post('/signup', isNotLoggedIn ,passport.authenticate('local.signup',{ //nombre de la autenticacion
            successRedirect: '/profile', //si todo sale bien redireccionalo a profle
            failureRedirect: 'signup',//formulario
            failureFlash: true
        }
    )
);
//para el loguea//renderizar el formulario
router.get('/signin', isNotLoggedIn,(req,res)=>{
    res.render('auth/signin');
});

//ejecutamos el signin 
router.post('/signin', isNotLoggedIn,(req,res, next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/profile'        ,
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
    
});
//con isLoggedIn verificamos si esta logueado, y si lo esta que continue
//pero si no lo esta, lo redireccionara
router.get('/profile',isLoggedIn,  (req, res)=>{
    res.render('profile');
});
//termina la session del usuario
router.get('/logout', isLoggedIn,(req,res)=>{
    req.logOut();//ya no existe el usuario
    res.redirect('/signin');
})

module.exports = router;
