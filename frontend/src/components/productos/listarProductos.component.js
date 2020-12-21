import React, { useContext, useState, useEffect } from 'react';
import { UsuarioContext } from "../../contexts/UsuarioContext";
import { ProductosContext } from "../../contexts/ProductosContext";
import { CategoriasContext } from '../../contexts/CategoriasContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import eliminar from '../../assets/delete.png';
import editar from '../../assets/edit.png';


export default function ListarProducto(props) {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [productos, obtenerProductos] = useContext(ProductosContext);
    const [categorias, obtenerCategorias] = useContext(CategoriasContext);
    useEffect(obtenerProductos, []);

    const history = useHistory();

    const eliminarProducto = (idProducto) => {
        axios.delete('http://localhost:5000/productos/eliminar/', {
            data: {
                usuario: usuario._id,
                producto: idProducto
            }
        })
            .then(res => {
                console.log(res);
                obtenerProductos();
            })
            .catch(e => {
                console.log(e);
            })
    }

    const modificarProducto = (_id, copiaNombre, copiaPrecio, copiaCategoria) => {
        history.push({
            pathname: '/productos/modificar',
            state: {
                producto: _id,
                nombre: copiaNombre,
                precio: copiaPrecio,
                categoria: copiaCategoria,
            }
        });
    }

    const obtenerNombreCategoria = (idCategoria) => {
        const categoriaEncontrada = categorias.find(categoria => categoria._id == idCategoria);
        if (categoriaEncontrada != undefined && categoriaEncontrada != null) {
            return categoriaEncontrada.nombre;
        } else {
            return 'Categoria no encontrada';
        }

    }

    return (
        <div table className=" container formulario table table-dark" >
            <h1>Productos registrados: </h1>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Categoría</th>
                        <th scope="col" colSpan="3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{producto.nombre}</th>
                                    <td>{producto.precio}</td>
                                    <td>{obtenerNombreCategoria(producto.categoria)}</td>
                                    <td className="button" id="btnDelete"><img src={eliminar} width="25px" alt="Eliminar" onClick={() => eliminarProducto(producto._id)} /></td>
                                    <td className="button" id="btnEdit"><img src={editar} width="25px" alt="Editar" onClick={() => modificarProducto(producto._id, producto.nombre, producto.precio, producto.categoria)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );

}