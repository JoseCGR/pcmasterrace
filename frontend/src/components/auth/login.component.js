import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../style/style.css';
import { useForm } from 'react-hook-form';
import { UsuarioContext } from "../../contexts/UsuarioContext";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const [mensajeError, setMensajeError] = useState("");
  const history = useHistory();
  const [usuario, setUsuario, establecerToken] = useContext(UsuarioContext);

  const mostrarMensajeError = () => {
    setMensajeError("Usuario o contraseña inválidos");
  }

  const onSubmit = (data) => {
    const usuario = {
      "email": data.email,
      "password": data.password
    }

    axios.post('http://localhost:5000/login', usuario)
      .then(res => {
        const token = res.headers['authorization'];
        const guardar = async () => {
          await localStorage.setItem("token", token);
        }
        guardar();
        establecerToken(token);
        history.push("/productos/listar");
      })
      .catch(e => {
        console.log(e);
        mostrarMensajeError();
      });
  }

  return (
    <div className="wrap">
      <div className="container formulario col-sm-6">
        <h1>PcMasterRace</h1>
        <h3><small class="text-muted">¡Aplicación para la venta de componentes para computadoras en línea!</small></h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group d-flex flex-column justify-content-center">
            <input
              type="text"
              placeholder="maestro@itson.edu.mx"
              className="form-control box"
              name="email"
              ref={register({ required: "*Correo requerido", pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Correo invalido" } })}
            ></input>
            {errors.email && <p className="error">{errors.email.message}</p>}
            <input type="password"
              placeholder="Contraseña"
              className="form-control box"
              name="password"
              ref={register({ required: "*Contraseña requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" }, maxLength: { value: 12, message: "Máximo 12 caracteres" } })}
            ></input>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div className="form-group">
            <input type="submit" value="Ingresar" className="btn btn-dark"></input>
          </div>
        </form>
        <p className="error">{mensajeError}</p>

        <a href="/registro">Registrar nuevo administrador</a>
      </div>
    </div>
  );

}
