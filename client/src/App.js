import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'



function App() {
  // Obtener datos
  const [id, setId] = useState();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState("");
  const [sexo, setSexo] = useState("");

  // Botones de editar y eliminar
  const [editar, setEditar] = useState(false);

  // Crear una lista
  const [usuariosList, setUsuarios] = useState([]);

  useEffect(() => {
    // Llama a la función getUsuarios() solo una vez cuando el componente se monta
    getUsuarios();
  }, []); // El segundo parámetro [] indica que este efecto se ejecuta solo una vez al montar el componente

  //Crear
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      fechaDeNacimiento: fechaDeNacimiento,
      sexo: sexo,
    }).then(() => {
      getUsuarios(); // Llama a getUsuarios después de agregar un nuevo usuario
      limpiarCampos()
    });
  };


//Editar usuarios
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      telefono: telefono,
      correo: correo,
      fechaDeNacimiento: fechaDeNacimiento,
      sexo: sexo,
    }).then(() => {
      getUsuarios(); // Llama a getUsuarios después de agregar un nuevo usuario
      limpiarCampos()
    });
  };

  //Eliminar usuarios
 //Eliminar usuarios
const deleteUsuarios = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
    getUsuarios(); // Llama a getUsuarios después de eliminar un usuario
    limpiarCampos();
  }).catch((error) => {
    console.error("Error al eliminar usuario:", error);
    // Aquí podrías manejar el error de alguna manera, por ejemplo, mostrando una alerta
    Swal.fire({
      icon: 'error',
      title: 'Error al eliminar usuario',
      text: 'Hubo un problema al intentar eliminar el usuario. Por favor, inténtalo de nuevo más tarde.',
    });
  });
};

  const limpiarCampos = ()=>{
    setNombre("");
    setTelefono("");
    setCorreo("");
    setFechaDeNacimiento("");
    setSexo("");
    setId("");
    setEditar(false);
  };


  const editarUsuario = (val) => {
    setEditar(true);

    setId(val.id);
    setNombre(val.nombre);
    setTelefono(val.telefono);
    setCorreo(val.correo);
    setFechaDeNacimiento(val.fechaDeNacimiento);
    setSexo(val.sexo);
  };

 //Lista de usuarios
 const getUsuarios = () => {
  Axios.get("http://localhost:3001/usuarios").then((response) => {
    setUsuarios(response.data);
  });
};  


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE USUARIOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => setNombre(event.target.value)}
              className="form-control"
              value={nombre}
              placeholder="Ingrese nombre"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Teléfono:
            </span>
            <input
              type="text"
              className="form-control"
              onChange={(event) => setTelefono(event.target.value)}
              value={telefono}
              placeholder="Ingrese teléfono"
              aria-label="Teléfono"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Correo:
            </span>
            <input
              type="email"
              className="form-control"
              onChange={(event) => setCorreo(event.target.value)}
              value={correo}
              placeholder="Ingrese correo"
              aria-label="Correo"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Fecha de nacimiento:
            </span>
            <input
              type="date"
              className="form-control"
              onChange={(event) => setFechaDeNacimiento(event.target.value)}
              value={fechaDeNacimiento || ""}
              aria-label="Fecha de nacimiento"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Sexo:
            </span>
            <input
              type="text"
              className="form-control"
              onChange={(event) => setSexo(event.target.value)}
              placeholder="Ingrese sexo"
              value={sexo}
              aria-label="Sexo"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="card-footer text-muted">
            {editar ? 
              <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button> 
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
              </div>
             : 
              <button className="btn btn-success" onClick={add}>
                Registrar
              </button>
            }
          </div>
        </div>
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Map sobre la lista de usuarios para crear filas de tabla */}
            {usuariosList.map((val, key) => (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.correo}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      onClick={() => editarUsuario(val)}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button type="button"
                    onClick={() => deleteUsuarios(val.id)}
                    className="btn btn-danger">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
