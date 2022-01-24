const express = require("express");
const { route } = require(".");
const router = express.Router();
const pool = require("../database"); //hace referencia a la base de datos
const {isLoggedIn} =require('../lib/auth');

router.get("/add", isLoggedIn,(req, res) => {
  res.render("links/add");
});


//agregar un nuevo archivo 
router.post("/add", isLoggedIn,async (req, res) => {
  //console.log(req.body);
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
    user_id: req.user.id

  };
  //gurdamos el nuevo link
  await pool.query("INSERT INTO links set ?", [newLink]);//como toma tiempo sera await
  //res.send("resivido");
  req.flash('success','Link saved successfully');
  res.redirect('/links');
});
//todos los links de la base de datos
//console.log(__dirname);
router.get('/', isLoggedIn, async (req, res)=>{
  const links =await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
  console.log(links);
  //links= JSON.stringify(links)
  res.render('links/list', {links});

});
router.get('/delete/:id', isLoggedIn,async(req,res)=>{
  const {id} =req.params;
  await pool.query("DELETE FROM links WHERE ID= ?",[id]);
  //res.send("eliminado");
  req.flash('success','Link Removed successfully');
  res.redirect('/links');
});


router.get('/edit/:id', isLoggedIn  ,async(req,res)=>{
  const {id} =req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?",[id]);
   //console.log(links[0]);
  // console.log(__dirname);
  res.render('links/edit',{link: links[0]});
});

router.post('/edit/:id', async (req,res)=>{
  const {id} = req.params;//para el parametro  que nos envia siempre id
  //ocupamos el req.body para validar los datos en un futuro
  const {title, description, url} = req.body;
  const newLink ={
      title,
      description,
      url
  };
  await pool.query("UPDATE links SET ? WHERE id = ?", [newLink, id]);// le mandamos los datos a actulizar y el id donde buscar el dato
  req.flash('success','Link Updated successfully');
  res.redirect('/links');
});
module.exports = router;
