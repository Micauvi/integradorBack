app.post('/CrearUsuarios', jsonParser, function (req, res) {
    var usuario = req.body.usuario;
    var clave = req.body.clave;
    var estado = req.body.estado;
    connection.query("insert into usuarios(usuario,clave,estado) values(?,?,?)", [usuario, clave, estado], function (error, results, fields) {
        res.send(JSON.stringify(results.insertId));
    }
)})
//2021-02 backend

// UsersModel.findAll({ attributes: ["ID_USER", "USUARIO", "CONTRASENA"] })
//   .then((usuario) => {
//     console.log(usuario);
//   })
//   .catch((err) => console.log(err));


// sequelize
//   .authenticate()
//   .then(() => console.log("funciona la base de datos"))
//   .catch((err) => console.log("No se conecto a la base de datos", err));

// capas sirve despues 

// app.get('/register',(req,res)=>{
//    res.sendFile(path.join(__dirname,"../../ProyectoFinal/integrador/src/app/register/register.component.html"))
// })


// app.post("/account",(req,res)=>{
//    res.status(200).sendFile(path.resolve("../../ProyectoFinal/integrador/src/app/","../../ProyectoFinal/integrador/src/app/account/account.component.html"))
// })


// app.get('/login',(req,res)=>{
//    res.sendFile(path.join(__dirname,"../../ProyectoFinal/integrador/src/app/login/login.component.html"))
//   console.log(req.body)
//    return res.status(200).sendFile(path.resolve("../ProyectoFinal/integrador/src/app/account","account.component.html"))

// })
connection.query("insert into usuarios(usuario,contrasena) values(?,?)", [usuario, contrasena], function (error, results, fields) {
    res.send(JSON.stringify(results.insertId));
}
)})