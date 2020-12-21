import React, { useState, createContext, useEffect, useContext } from 'react';
import { UsuarioContext } from './UsuarioContext'
import axios from 'axios';

export const ProductosContext = createContext();

export const ProductosProvider = (props) => {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [productos, setProductos] = useState([]);

    const obtenerProductos = () => {
        if (usuario != undefined && usuario != null) {
            const idUsuario = usuario._id;
            axios.get('http://localhost:5000/productos/', { headers: { authorization: idUsuario } })
                .then(res => {
                    console.log(res);
                    establecerProductos(res.data)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    function establecerProductos(productos) {
        setProductos(productos);
    }

    useEffect(obtenerProductos, [usuario]);

    return (
        <ProductosContext.Provider value={[productos, obtenerProductos]}>
            {props.children}
        </ProductosContext.Provider>
    );

}