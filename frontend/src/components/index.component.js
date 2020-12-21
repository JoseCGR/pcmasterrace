import React, { Component } from "react";
import './style/style.css';

export default class Index extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="container index">
          <div className="header">
            <h1>PasaLista</h1>
            <h3>¡Extensión para el manejo de asistencias por medio de plataformas 
                educativas virtuales como Google Meet!</h3>
          </div>
          <div className="buttons">
            <button className="btn btn-primary">Iniciar Sesión</button>
            <button className="btn btn-primary">Registrarme</button>
          </div>
        </div>
      </div>
    );
  }
}