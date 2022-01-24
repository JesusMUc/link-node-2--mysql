module.exports ={
    //para saber si alguien esta logueado o no
    isLoggedIn(req,res,next){
        if(req.isAuthenticated() ){
            return next();
        }//si no esta logueado regresarlo
        return res.redirect('/signin');
    },
    //proceso inverso para que no vea rutas cuando esta logueado
    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        else{
            return res.redirect('/profile');
        }
    }
}