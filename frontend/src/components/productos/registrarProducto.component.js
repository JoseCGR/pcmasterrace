import React, { useContext, useState } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { ProductosContext } from "../../contexts/ProductosContext";
import { CategoriasContext } from "../../contexts/CategoriasContext";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';

export default function RegistrarProducto() {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [productos, obtenerProductos] = useContext(ProductosContext);
    const [categorias, obtenerCategorias] = useContext(CategoriasContext);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
    const { register, handleSubmit, errors } = useForm();
    const [mensajeError, setMensajeError] = useState("");

    const mostrarMensajeError = (msj) => {
        setMensajeError(msj);
    }

    const onSubmit = (data) => {
        if (categorias != undefined && categorias.length > 0) {
            const producto = {
                "nombre": data.nombre,
                "precio": data.precio,
                "categoria": categorias[categoriaSeleccionada]._id,
            }
            const registrarProducto = () => {
                axios.post('http://localhost:5000/productos/add', producto)
                    .then(res => {
                        console.log(res);
                        borrarCampos();
                        setShow(true);
                    })
                    .catch(e => {
                        console.log(e);
                        mostrarMensajeError();
                    });
            }

            const borrarCampos = () => {
                document.getElementById("forma-productos").reset();
            }

            registrarProducto();
        } else {
            mostrarMensajeError("No se ha elegido una categoria");
        }
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

    const handleChange = (event) => {
        const categoriaId = event.target.value;
        if (categoriaId != categoriaSeleccionada) {
            setCategoriaSeleccionada(categoriaId);
        }
    }

    return (
        <div className="wrap">
            <div className="formulario">
                <h1>Registro de nuevo producto</h1>
                <form id="forma-productos" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input
                            type="text"
                            placeholder="Nombre: NVIDIA GEFORCE GTX 1050ti"
                            className="form-control box"
                            name="nombre"
                            ref={register({ required: "*Nombre requerido", minLength: { value: 6, message: "Min 6 caracteres" }, maxLength: { value: 40, message: "Max 40 caracteres" } })}
                        ></input>
                        {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                        <input
                            type="text"
                            placeholder="Precio(MX): 3500"
                            className="form-control box"
                            name="precio"
                            ref={register({ required: "*Precio requerido", pattern: { value: /^[0-9\s]+$/, message: "Solo numeros" }, minLength: { value: 4, message: "Min 4 caracteres" }, maxLength: { value: 10, message: "Max 10 caracteres" } })}
                        ></input>
                        {errors.precio && <p className="error">{errors.precio.message}</p>}

                        <select value={categoriaSeleccionada} onChange={handleChange} className="form-control box">
                            {categorias.map((categoria, idx) => (
                                <option key={categoria._id} value={idx}>{categoria.nombre}</option>
                            ))}
                        </select>

                        {/* <input
                            type="text"
                            placeholder="Categoría: Tarjetas gráficas"
                            className="form-control box"
                            name="categoria"
                            ref={register({ required: "*Categoría requerida", minLength: { value: 4, message: "Min 4 caracteres" }, maxLength: { value: 40, message: "Max 40 caracteres" } })}
                        ></input>
                        {errors.categoria && <p className="error">{errors.categoria.message}</p>} */}
                    </div>
                    <div className="form-group d-flex flex-column justify-content-center">
                        <input type="submit" value="Registrar producto" className="btn-secondary"></input>
                    </div>
                </form>
                <p className="error">{mensajeError}</p>
                <AlertaExito />
            </div>
        </div>
    );

}