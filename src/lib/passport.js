const passport =require('passport'); //tipo de autenticacion
//de manera local
const LocalStrategy = require('passport-local').Strategy;
const pool  = require('../database');
const helpers = require('../lib/helpers');

//para el login 
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req, username, password, done)=>{
    // //comprobamos el usuario
    // console.log(req.body);
    //consulta a la base de dtoa
    const rows =await pool.query('SELECT * FROM users WHERE  username = ? ',[username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password,user.password);
        if(validPassword){
            done(null, user, req.flash("success","Welcome "+user.username));
        }
        else{
            done(null, false, req.flash("message","Incorrect Password"));
        }
    }else{
        return done(null, false, req.flash("message","The Username doesn't Exist "));
    }
}));



passport.use('local.signup', new LocalStrategy({
    //lo que resiviremos de authentication de routes con los datos enviados del post
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: 'true'//para recibir el objeto reques de esta funcion

}, async(req,username, password, done)=>{

    //    console.log(req.body);
    //creamos un nuevo usuario
    const { fullname}= req.body;
    const newUser={
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPassword(password); //encripta la contraseña
    
    //almacenarlo en la base de datos
    const result = await pool.query("INSERT INTO users SET ?",[newUser]);
    newUser.id = result.insertId;
    //console.log(result);
    return done(null, newUser);//null porque no hay error, el newUser para que lo almacene en una secion 
    
})); //tipo de autenticacion

//dos tipo de una para serializar    //
passport.serializeUser((user,done)=>{    //aca empieza a guardar al usuario en una secion 
    done(null, user.id);
});
//desealisar de la secion
passport.deserializeUser(async(id, done )=>{
    const rows =await pool.query("SELECT * FROM users WHERE id = ? ",[id]);
    done(null, rows[0]);
});



module.exports