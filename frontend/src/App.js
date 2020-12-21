import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

import { UsuarioProvider } from "./contexts/UsuarioContext";

import Navbar from "./components/navbar.component";


import Registro from './components/auth/registro.component';
import Login from './components/auth/login.component';
import PrivateRoute from './components/auth/privateRoute';

import { ProductosProvider } from "./contexts/ProductosContext";
import ListarProductos from "./components/productos/listarProductos.component";
import RegistrarProducto from './components/productos/registrarProducto.component';
import ModificarProducto from './components/productos/modificarProducto.component';


import { CategoriasProvider } from "./contexts/CategoriasContext";
import RegistrarCategoria from './components/categorias/registrarCategoria.component';


function App() {

  return (
    <Router>
      <Navbar />
      <br />
      <UsuarioProvider>
        <ProductosProvider>
          <Route path="/" exact component={Login} />
          <Route path="/registro" exact component={Registro} />
          <Route path="/login" exact component={Login} />
          <CategoriasProvider>
            <PrivateRoute path="/categorias/registrar" exact component={RegistrarCategoria} />
            <PrivateRoute path="/productos/listar" exact component={ListarProductos} />
            <PrivateRoute path="/productos/registrar" exact component={RegistrarProducto} />
            <PrivateRoute path="/productos/modificar" exact component={ModificarProducto} />
          </CategoriasProvider>
        </ProductosProvider>
      </UsuarioProvider>
    </Router>
  );
}

export default App;
