const express = require("express"); //Se utiliza para importar el módulo Express
const app = express ();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost", 
    user:"root",
    password:"",
    database:"usuarios"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const fechaDeNacimiento = req.body.fechaDeNacimiento; // Corrección aquí
    const sexo = req.body.sexo;

    db.query("INSERT INTO usuarios(nombre, telefono, correo, fechaDeNacimiento, sexo) VALUES(?,?,?,?,?)",[nombre,telefono,correo,fechaDeNacimiento,sexo],

    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send("Usuario registrado con éxito!!");
        }
    }
    );
 
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})
