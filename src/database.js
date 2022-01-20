//CONEXION CON LA BASE DE DATOS
const mysql = require("mysql");
const { promisify } = require("util"); //de note  de collback a promesas, ya que no soporta async await

const { database } = require("./keys");

//para la conexion, mas cercano al de uno de produccion a una base de datos
//const pool = mysql.createPool(database);
const pool =mysql.createPool(database);

pool.getConnection((err, connection)=>{
  if (err) {
   // console.log(err);
    if (err.code === "PROTOCOL_CONECTION_LOST") {
      console.error("DATA BASE CONNECTION WAS CLOSED");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TO MANY CONNECTIONS");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE  DLVo CONNECTION WAS REFUSED");
    }
  }
  if (connection){
    //console.log("aca andamos sin errores compa")
    connection.release();
    console.log("DB Conectado sin problema Todo chido");
    return;
  } 
  
}); //modulo ya con conexion para no estar llamandolo a cada rato}
pool.query =promisify(pool.query);

module.exports = pool;
// Load module
// Initialize pool
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "127.0.0.1",
//   port: 3306,
//   user: "root",
//   password: "root",
//   database: "database_links",
//   debug: false
// });
// pool.getConnection((err, connection) => {

// //desde este modulo te passamos el pol y solo queremos los metodos que empiecen con query
// pool.query = promisify(pool.query); //y asi poder ocupar async awair en las consultas o promesas
// //lo que antes eran collback ahora seran promesas

// module.exports = pool;
