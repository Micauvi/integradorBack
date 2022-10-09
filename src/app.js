const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

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
  CONTRASENA: DataTypes.STRING(50),
  PAIS: DataTypes.STRING(50),
  CIUDAD: DataTypes.STRING(50),
  createdAt: DataTypes.DATE(50),
  updatedAt: DataTypes.DATE(50),
});

// esto codifica las url -> quita el %20 de las url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.resolve("../../ProyectoFinal/integrador/src/app/"))
);

const jsonParser = bodyParser.json();

//permite el login

app.post("/login", async (req, res) => {
  const USUARIO = req.body.USUARIO;
  const CONTRASENA = req.body.CONTRASENA;

  try {
    const users = await UsersModel.findAll();
    const seleccionarUsuario = users.find((usuarioRegistrado) => {
      return (usuarioRegistrado.USUARIO === USUARIO && usuarioRegistrado.CONTRASENA===CONTRASENA)
      
    });
    console.log(seleccionarUsuario);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error " });
  }
});


//endpoint para registrarse
app.post("/api/user", async (req, res) => {
  try {
    // console.log(req.body);
    const usuario = await UsersModel.create(req.body);
    // res.json(usuario)
    res.status(200).json({ status: "exitoso" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error " });
  }
});

// obtiene todos los usuarios registrados
app.get("/api/users", (req, res) => {
  res.status(200).json({ status: "exitoso" });
});

//mensajes recibidos por x usuarios
app.get("/api/users/<username>/messges/inbox", (req, res) => {
  res.status(200).json({ status: "existoso" });
});
//mensajes enviados por x usuarios
app.get("/api/users/<username>messages/sent", (req, res) => {
  res.status(200).json({ status: "exitoso" });
});
//enviar mensaje a N destinatarios
app.post("/api/users/<username>/messages/", (req, res) => {
  req.body.res.status(200).json({ status: "exitoso" });
});
app.get("/exitoso", (req, res) => {
  res.status(200).json({ status: "exitoso" });
});


// app.post('/registro', jsonParser, function (req, res) {
//   const usuario = req.body.usuario;
//   const contrasena = req.body.contrasena;
// })

app.listen(PORT, () => console.log("funciona"));

//ejecuta metodos funcionales y transforma un objeto en lo que queramos

// const toCaps = x =>  Object.fromEntries(Object.entries(x).map(([key, value]) => [key.toUpperCase(), value]))
