import React,{useState, createContext, useEffect} from 'react';
import axios from 'axios';



export const UsuarioContext = createContext();

export const UsuarioProvider = (props) => {
    const [usuario, setUsuario] = useState({});
    const [token, setToken] = useState("");

    if(token=="") {
        establecerToken(localStorage.getItem('token'));
    } 

    const obtenerUsuario = ()=> {
        if(token != null && token != "") {
            axios.get('http://localhost:5000/usuarios/', {headers:{authorization:token}})
            .then(res => { 
                establecerUsuario(res.data)
            })
            .catch(e => {        
                console.log(e);
            })  
        }        
    }

    function establecerToken(token) {
        setToken(token);
    }    

    function establecerUsuario(usuario) {
        setUsuario(usuario);
    }

    useEffect(obtenerUsuario, [token]);  

    return (
        <UsuarioContext.Provider value ={[usuario, establecerUsuario, establecerToken]}>
            {props.children}
        </UsuarioContext.Provider>
    );
    
}