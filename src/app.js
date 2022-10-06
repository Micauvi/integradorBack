const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require('body-parser')

const { Sequelize, DataTypes, DATE } = require("sequelize");


dotenv.config();

const sequelize = new Sequelize(
  "usuarios",
  process.env.USER,
  process.env.PASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const UsersModel = sequelize.define("users", {
  ID_USER: { type: DataTypes.INTEGER, primaryKey: true },
  NOMBRE: DataTypes.STRING(50),
  APELLIDO: DataTypes.STRING(50),
  USUARIO: DataTypes.STRING(50),
  CONTRASENA: DataTypes.INTEGER,
  PAIS: DataTypes.STRING(50),
  CIUDAD: DataTypes.STRING(50),
});



// esto codifica las url -> quita el %20 de las url y lo hace texto plano
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve("../../ProyectoFinal/integrador/src/app/")))


const jsonParser = bodyParser.json()

app.listen(PORT, () => console.log('funciona'))

// este deberia ser el de api/users
app.get("/account",(req,res)=>{
  // res.status(200).sendFile(path.resolve("../ProyectoFinal/integrador/src/app/account","account.component.html"))
  res.status(200).json({status:"exitoso"})
})


//permite el login
app.post("/login",async(req,res)=>{

  const login=await UsersModel.findAll({attributes:["USUARIO","CONTRASENA"]})
    console.log(USUARIO,CONTRASENA)
  res.status(200).json({status:"exitoso"})
  res.status(404).json({status:"incorrecto"})
})


// obtiene todos los usuarios registrados
app.get("/api/users",(req,res)=>{
   res.status(200).json({status:"exitoso"})

})
//endpoint para registrarse
app.post("/api/user",(req,res)=>{
  // const {NOMBRE,APELLIDO,USUARIO,PAIS,CIUDAD,CONTRASENA} = re.body
  // const newLink= {NOMBRE, APELLIDO, USUARIO,PAIS,CIUDAD,CONTRASENA}
  // await UsersModel.query('INSERT INTO user set ?', [newLink])
  // res.send('recibido')
  // console.log(req.body)
  // const register = await UsersModel.create('INSERT INTO users("USUARIO","NOMBRE","APELLIDO","PAIS","CIUDAD","CONTRASEÑA")')
 
  // console.log(USUARIO)  
  // UsersModel.create({
  //   NOMBRE:req.body.APELLIDO,
  //   APELLIDO:req.body.APELLIDO,
  //   USUARIO:req.body.USUARIO,
  //   CONTRASENA:req.body.CONTRASENA,
  //   PAIS:req.body.PAIS,
  //   CIUDAD:req.body.CIUDAD
  // })
  // .then((USUARIO)=>{
  //   res.json(USUARIO)
  // })
  // const create = await Pool.query('INSERT INTO users("USUARIO","NOMBRE","APELLIDO","PAIS","CIUDAD","CONTRASEÑA") VALUES ?')
  res.status(200).json({status:"exitoso"})
  
})
//mensajes recibidos por x usuarios
app.get("api/users/<username>/messges/inbox",(req,res)=>{
  res.status(200).json({status:"existoso"})
})
//mensajes enviados por x usuarios
app.get("/api/users/<username>messages/sent",(req,res)=>{
  res.status(200).json({status:"exitoso"})
})
//enviar mensaje a N destinatarios
app.post("/api/users/<username>/messages/",(req,res)=>{
  req.body.
  res.status(200).json({status:"exitoso"})
})

// app.post('/registro', jsonParser, function (req, res) {
//   const usuario = req.body.usuario;
//   const contrasena = req.body.contrasena;
// })
  

