import React, { useContext, useState } from 'react';
import { CategoriasContext } from "../../contexts/CategoriasContext";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';

export default function RegistrarCategoria() {
    const [categorias, obtenerCategorias] = useContext(CategoriasContext);
    const { register, handleSubmit, errors } = useForm();
    const [mensajeError, setMensajeError] = useState("");

    const mostrarMensajeError = () => {
        setMensajeError("Error al agregar categoria");
    }

    const onSubmit = (data) => {
        const categoria = {
            "nombre": data.nombre,
        }
        const registrarCategoria = () => {
            axios.post('http://localhost:5000/categorias/add', categoria)
                .then(res => {
                    console.log(res);
                    obtenerCategorias();
                    borrarCampos();
                    setShow(true);
                })
                .catch(e => {
                    console.log(e);
                    mostrarMensajeError();
                });
        }
        const borrarCampos = () => {
            document.getElementById("forma-categorias").reset();
        }

        registrarCategoria();
    }

    const [show, setShow] = useState(false);
    function AlertaExito() {
        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Registro exitoso</Alert.Heading>
                </Alert>
            );
        }
        return (<div></div>);
    }

    return (
        <div className="wrap">
            <div className="formulario">
                <h1>Registro de nueva categoría</h1>
                <form id="forma-categorias" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input
                            type="text"
                            placeholder="Nombre: Tarjetas gráficas"
                            className="form-control box"
                            name="nombre"
                            ref={register({ required: "*Nombre requerido", pattern: { value: /^[a-zA-Z\s]+$/, message: "Solo letras" }, minLength: { value: 6, message: "Min 6 caracteres" }, maxLength: { value: 20, message: "Max 20 caracteres" } })}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                    </div>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input type="submit" value="Registrar categoría" className="btn-secondary"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </div>
        </div>
    );

}