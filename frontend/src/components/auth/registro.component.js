import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../style/style.css';
import { useForm } from 'react-hook-form'

export default function Registro() {
    const { register, handleSubmit, errors } = useForm();
    const [mensajeError, setMensajeError] = useState("");
    const history = useHistory();

    const mostrarMensajeError = () => {
        setMensajeError("Ya existe un usuario con ese nombre o correo electronico");
    }

    const onSubmit = (data) => {
        const usuario = {
            "nombre": data.name,
            "email": data.email,
            "password": data.password,
            "role": "MAESTRO"
        }

        axios.post('http://localhost:5000/register/', usuario)
            .then(res => {
                history.push("/login");
            })
            .catch(e => {
                console.log(e);
                mostrarMensajeError();
            });
    }


    return (
        <div className="wrap">
            <div className="container formulario">
                <h1>PcMasterRace</h1>
                <h3><small class="text-muted">Registro de un nuevo usuario</small></h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="form-control box"
                            name="name"
                            ref={register({ required: "*Nombre requerido", pattern: { value: /^[a-zA-Z\s]+$/, message: "Solo letras" }, minLength: { value: 4, message: "Min 4 caracteres" }, maxLength: { value: 15, message: "Max 15 caracteres" } })}
                        ></input>
                        {errors.name && <p className="error">{errors.name.message}</p>}
                        <input
                            type="text"
                            placeholder="maestro@itson.edu.mx"
                            className="form-control box"
                            name="email"
                            ref={register({ required: "*Correo requerido", pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Correo invalido" } })}
                        ></input>
                        {errors.email && <p className="error">{errors.email.message}</p>}
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="form-control box"
                            name="password"
                            ref={register({ required: "*Contraseña requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" }, maxLength: { value: 12, message: "Máximo 12 caracteres" } })}
                        ></input>
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Registrar" className="btn btn-dark"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>

                <a href="/login">¿Ya tiene una cuenta? Iniciar sesión</a>
            </div>
        </div>
    );

}
