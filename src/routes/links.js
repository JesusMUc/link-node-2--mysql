const express = require("express");
const router = express.Router();
const pool = require("../database"); //hace referencia a la base de datos

router.get("/add", (req, res) => {
  res.render("links/add");
});
//agregar un nuevo archivo 
router.post("/add", async (req, res) => {
  //console.log(req.body);
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description
  };
  //gurdamos el nuevo link
  await pool.query("INSERT INTO links set ?", [newLink]);//como toma tiempo sera await
  //res.send("resivido");
  res.redirect('/links');
});
//todos los links de la base de datos
//console.log(__dirname);
router.get('/', async (req, res)=>{
  const links =await pool.query('SELECT * FROM links');
  console.log(links);
  //links= JSON.stringify(links)
  res.render('links/list', {links});

});
router.get('/delete/:id', async(req,res)=>{
  const {id} =req.params;
  await pool.query("DELETE FROM links WHERE ID= ?",[id]);
  //res.send("eliminado");
  res.redirect('/links');
})

module.exports = router;
