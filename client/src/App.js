import './App.css';
import { useState } from 'react';
import Axios from "axios";

function App() {

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState("");
  const [sexo, setSexo] = useState("");

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      telefono:telefono,
      correo:correo,
      fechaDeNacimiento:fechaDeNacimiento,
      sexo:sexo,
    }).then(() => {
      alert("Usuario registrado");
    }).catch(error => {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    });
  }


  return (
    <div className="App">
     <div className="datos">
     <label>Nombre: <input onChange={(event) => setNombre(event.target.value)} type="text" /></label>
        <label>Teléfono: <input onChange={(event) => setTelefono(event.target.value)} type="text" /></label>
        <label>Correo: <input onChange={(event) => setCorreo(event.target.value)} type="email" /></label>
        <label>Fecha de nacimiento: <input onChange={(event) => setFechaDeNacimiento(event.target.value)} type="date" /></label>
        <label>Sexo: <input onChange={(event) => setSexo(event.target.value)} type="text" /></label>

        <button onClick={add}>Registrar</button>
      <button>Editar</button>
     </div>
    </div>
  );
}

export default App;
