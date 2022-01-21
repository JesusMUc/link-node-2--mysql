const passport =require('passport'); //tipo de autenticacion
//de manera local
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signup', new LocalStrategy({
    //lo que resiviremos
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: 'true'//para recibir el objeto reques de esta funcion

}, async(req,username, password, done)=>{

    console.log(req.body);

})); //tipo de autenticacion
//dos tipo de una para serializar   
// passport.serializeUser((usr,done)=>{    //aca empieza a guardar al usuario en una secion 

// });
//otra para deserealizar

module.exports