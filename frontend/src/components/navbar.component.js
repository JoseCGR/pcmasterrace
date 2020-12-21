import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import { authenticationService } from './services/authentication.service';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavegacionPrincipal() {
    const refContainer = useRef(null);

    const logout = () => {
        authenticationService.logout();
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">PcMasterRace</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" ref={refContainer}>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/categorias/registrar">Categorías</Nav.Link>
                        <NavDropdown title="Productos" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/productos/listar">Ver productos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/productos/registrar">Registrar productos</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/login" onClick={logout}>Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

}