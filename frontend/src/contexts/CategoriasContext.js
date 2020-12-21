import React, { useState, createContext, useEffect, useContext } from 'react';
import { UsuarioContext } from './UsuarioContext'
import axios from 'axios';

export const CategoriasContext = createContext();

export const CategoriasProvider = (props) => {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const [categorias, setCategorias] = useState([]);

    const obtenerCategorias = () => {
        if (usuario != undefined && usuario != null) {
            const idUsuario = usuario._id;
            axios.get('http://localhost:5000/categorias/', { headers: { authorization: idUsuario } })
                .then(res => {
                    console.log(res);
                    establecerCategorias(res.data)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    function establecerCategorias(categorias) {
        setCategorias(categorias);
    }

    useEffect(obtenerCategorias, [usuario]);

    return (
        <CategoriasContext.Provider value={[categorias, obtenerCategorias]}>
            {props.children}
        </CategoriasContext.Provider>
    );

}