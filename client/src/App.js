import './App.css';
import { useState } from 'react';

function App() {

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState(0);
  const [sexo, setSexo] = useState("");

  const mostrarDatos = ()=>{
    alert(nombre);
  }


  return (
    <div className="App">
     <div className="datos">
      <label>Nombre: <input onChange={(event)=>{setNombre(event.target.value);}} type="text"/></label>
      <label>Telefono: <input onChange={(event)=>{setTelefono(event.target.value);}}   type="text"/></label>
      <label>Correo: <input onChange={(event)=>{setCorreo(event.target.value);}}  type="e_mail"/></label>
      <label>Fecha de nacimiento: <input onChange={(event)=>{setFechaDeNacimiento(event.target.value);}} type="date"/></label>
      <label>Sexo: <input onChange={(event)=>{setSexo(event.target.value);}} type="text"/></label>
    
      <button onClick={mostrarDatos}>Registrar</button>
      <button>Editar</button>
     </div>
    </div>
  );
}

export default App;
