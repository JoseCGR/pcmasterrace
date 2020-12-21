import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import Alert from 'react-bootstrap/Alert';
import { CategoriasContext } from "../../contexts/CategoriasContext";

export default function ModificarCurso(props) {
    const { register, handleSubmit, errors } = useForm();
    const [mensajeError, setMensajeError] = useState("");
    const [categorias, obtenerCategorias] = useContext(CategoriasContext);

    const producto = props.location.state.producto;
    const nombre = props.location.state.nombre;
    const precio = props.location.state.precio;
    const categoria = props.location.state.categoria;
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoria);



    const mostrarMensajeError = () => {
        setMensajeError("Error al modificar producto");
    }

    const onSubmit = (datos) => {
        const modificarProducto = () => {
            axios.put('http://localhost:5000/productos/modificar', {
                data: {
                    producto: producto,
                    nombre: datos.nombre,
                    precio: datos.precio,
                    categoria: categoriaSeleccionada,
                }
            })
                .then(res => {
                    console.log(res);
                    setShow(true);
                })
                .catch(e => {
                    console.log(e);
                    mostrarMensajeError();
                });
        }

        modificarProducto();
    }

    const [show, setShow] = useState(false);
    function AlertaExito() {
        if (show) {
            return (
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Modificación exitosa</Alert.Heading>
                </Alert>
            );
        }
        return (<div></div>);
    }

    const handleChange = (event) => {
        const categoriaId = event.target.value;
        if (categoriaId != categoriaSeleccionada) {
            setCategoriaSeleccionada(categoriaId);
        }
    }

    return (
        <div className="wrap">
            <div className="formulario col-sm-7">
                <h1>Modificación de producto</h1>
                <form id="forma-productos" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input
                            type="text"
                            defaultValue={nombre}
                            className="form-control box"
                            name="nombre"
                            ref={register({ required: "*Nombre requerido", minLength: { value: 6, message: "Min 6 caracteres" }, maxLength: { value: 40, message: "Max 40 caracteres" } })}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                        <input
                            type="text"
                            defaultValue={precio}
                            className="form-control box"
                            name="precio"
                            ref={register({ required: "*Precio requerido", pattern: { value: /^[0-9\s]+$/, message: "Solo numeros" }, minLength: { value: 4, message: "Min 4 caracteres" }, maxLength: { value: 10, message: "Max 10 caracteres" } })}
                        ></input>
                        {errors.precio && <p className="error">{errors.precio.message}</p>}

                        <select value={categoriaSeleccionada} onChange={handleChange} className="form-control box">
                            {categorias.map((categoria, idx) => (
                                <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input type="submit" value="Modificar producto" className="btn btn-dark"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </div>


        </div>
    );

}