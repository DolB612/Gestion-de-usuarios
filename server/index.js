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
// POST Crear nuevos usuarios
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
            res.send(result);
        }
    }
    );
 
});

// GET devuelve lista de usuarios exclusivamente con el id, nombre y correo.
app.get("/usuarios",(req,res)=>{

    db.query("SELECT id, nombre, correo FROM usuarios",

    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send(result);
        }
    }
    );
 
});

// PUT para editar datos del usuario

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const fechaDeNacimiento = req.body.fechaDeNacimiento; 
    const sexo = req.body.sexo;

    db.query("UPDATE usuarios SET nombre=?, telefono=?, correo=?, fechaDeNacimiento=?, sexo=? WHERE id=? ",
  [nombre, telefono, correo, fechaDeNacimiento, sexo, id],


    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send("Usuario actualizado con éxito");
        }
    }
    );
 
});


// Eliminar usuarios Delete
app.delete("/delete/:id",(req,res)=>{ 
    const id = req.params.id; 

    db.query("DELETE FROM usuarios WHERE id=? ",[id], 


    (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send("Usuario ELIMINADO con éxito");
        }
    }
    );
 
}); 
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})
