/*
aplicacaion que guarda nuestros link favoritos
echo en nodeJs, mysql, express, and others
correrlo como npm run start
*/
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");
const flash =require('connect-flash');
const session =require('express-session');//alamcena los datos en la memria del servidor
const MySQLStore =  require("express-mysql-session");
const passport= require('passport');

const {database} =require('./keys');
//inicializaciones
const app = express();
require('./lib/passport');

//settings
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views")); //direccion de vistas

//archivos de handlervars
//y su motor de plantillas //y le damos un objeto de configuracion
app.engine(
  ".hbs",
  exphbs.engine({
    //las maneras en que ocuparemos las vistas
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
//console.log(__dirname);
//utilizamos , pra configurar el motor de plantillas
app.set("view engine", ".hbs");

//middlewares funciones que se ejecutan que un usuario hace una peticion al servidor
app.use(session({
  secret:'ucMysqlNodeSession',//como empezara a guardar la seccion
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)   //con esta configuracion la secion se queda almacenada en la base de datos 
}));
app.use(flash());
app.use(morgan("dev")); //muestra un mensaje en consola
app.use(express.urlencoded({ extended: false })); //para aceptar los datos que nos envien desde el formulario
app.use(express.json());
app.use(passport.initialize());
//guara la secion passport
app.use(passport.session());



//global variables
app.use((req, res, next) => {

  app.locals.success = req.flash('success');//con esto lo hacemos disponible en todas las vistas

  next();
});

//routes
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

//Public Files
app.use(express.static(path.join(__dirname, "public")));


//Starting Server
app.listen(app.get("port"), () => {
  console.log("Server on port: " + app.get("port"));
});
