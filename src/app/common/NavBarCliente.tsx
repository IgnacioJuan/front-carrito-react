import React, { useState } from "react";
import "../styles/Navbar.css";

export const NavBarCliente: React.FC = () => {
  const eliminarUser = () => {
    sessionStorage.removeItem("user");
  };
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <div>
        <body className="body2">
          <nav>
            <div className="icon_diente"></div>
            <div id="logo">Odontología Integral SM</div>

            <label htmlFor="drop" className="toggle">
              Menu
            </label>
            <input type="checkbox" id="drop" />
            <ul className="menu">
              <li>
                <label htmlFor="drop" className="toggle">
                  Home
                </label>
                <a href="/home">
                  <div className="HomeM"></div>
                </a>
              </li>
              <li>
                <label htmlFor="drop-3" className="toggle">
                  Historial
                </label>
                <a href="#">Historial Medico</a>
                <input type="checkbox" id="drop-3" />
                <ul style={{ zIndex: 999 }}>
                  <li>
                    <a href="/historialPiezas">■ Historial de Piezas</a>
                  </li>
                  <li>
                    <a href="/historial">■ Historial Clínico Dental</a>
                  </li>
                </ul>
              </li>
              <li className="liExit">
                <label htmlFor="drop" className="toggle">
                  Cerrar Sesión
                </label>
                <a href="/inicio" onClick={eliminarUser}>
                  <div className="ExitM"></div>
                </a>
              </li>
            </ul>
          </nav>
        </body>
      </div>
    </>
  );
};
