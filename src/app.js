const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


app.use(cors());

const { Sequelize, DataTypes, DATE, where, STRING } = require("sequelize");


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
  ID_USER: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true },
  NOMBRE: DataTypes.STRING(50),
  APELLIDO: DataTypes.STRING(50),
  USUARIO: DataTypes.STRING(50),
  CONTRASENA: DataTypes.STRING(255),
  PAIS: DataTypes.STRING(50),
  CIUDAD: DataTypes.STRING(50),
  createdAt: DataTypes.DATE(50),
  updatedAt: DataTypes.DATE(50),
});
const recibidosModel = sequelize.define("recibido", {
  id_recibidos: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true },
  USUARIO: DataTypes.STRING(50),
  asunto: DataTypes.STRING(250),
  texto: DataTypes.STRING(250),
  createdAt: DataTypes.DATE(50),
  updatedAt: DataTypes.DATE(50),
});
const enviadosModel = sequelize.define("enviados", {
  id_enviados: { type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true },
  USUARIO: DataTypes.STRING(50),
  asunto: DataTypes.STRING(250),
  texto: DataTypes.STRING(250),
  createdAt: DataTypes.DATE(50),
  updatedAt: DataTypes.DATE(50),
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  try {
    const compare = async (CONTRASENA, passHash) => {
      return await bcrypt.compare(CONTRASENA, passHash);
    };
    const { USUARIO, CONTRASENA } = req.body;
    const user = await UsersModel.findOne({ where: { USUARIO } });
    const checkPass = await compare(CONTRASENA, user.CONTRASENA);

    if (checkPass) {
      console.log("se compararon las contrasenas correctamente");
      return;
    }

    if (!checkPass) {
      console.log("usuario o contraseña incorrectas");

      return;
    }
  } catch (error) {
    console.log("hubo algun problema");
  }
});

app.post("/api/user", async (req, res) => {
  const CONTRASENA = req.body.CONTRASENA;
  const passHash = bcrypt.hashSync(CONTRASENA, bcrypt.genSaltSync(10));

  try {
    const usuario = await UsersModel.create({
      NOMBRE: req.body.NOMBRE,
      APELLIDO: req.body.APELLIDO,
      USUARIO: req.body.USUARIO,
      CONTRASENA: passHash,
      PAIS: req.body.PAIS,
      CIUDAD: req.body.CIUDAD,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error " });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    user = req.body.USUARIO;

    const user = await UsersModel.findOne({ where: { USUARIO } });
    res.json(USUARIO);
  } catch {
    res.status(400).json({ status: "Error " });
  }
});

app.get("/api/users/messges/inbox", (req, res) => {
  const mensajesRecibidos = recibidosModel.findAll().then((id_recibidos) => {
    res.json(id_recibidos);
  });
  res.status(200).json({ status: "existoso" });
});

app.get("/api/users/messages/sent", (req, res) => {
  try {
    const mensajesEnviados = enviadosModel.findAll().then((id_enviados) => {
      res.json(id_enviados);
    });
  } catch {
    res.status(400).json({ status: " Error" });
  }
});

app.post("/api/users/messages/", async (req, res) => {
  try {
    const enviarmensaje = await enviadosModel.create({
      id_enviados: req.body.id_enviados,
      USUARIO: req.body.USUARIO,
      asunto: req.body.asunto,
      texto: req.body.texto,
    });
    res.send(enviarmensaje);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "Error " });
  }
});

app.listen(PORT, () => console.log("funciona"));
