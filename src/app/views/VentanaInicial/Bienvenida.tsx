import React from "react";
import "../../styles/Header.css";
import { useHistory } from "react-router-dom";

const Bienvenida = () => {
  const history = useHistory();
  function handleClick() {
    history.push({
      pathname: "/auth/login",
    });
  }
  return (
    <div className="header flex flex-col" id="header">
      <div className="container flex">
        <div className="header-content">
          <h1 className="text-white fw-6 header-title" id="design">
            DESIGN * DEVELOPMENT * BRANDING
          </h1>
          <h1 className="text-white fw-6 header-title" id="dg">
            DIGITAL & TECH
          </h1>
          <h1 className="text-white fw-6 header-title" id="innovacion">
            INNOVACIÓN DE HOY PARA EL ÉXITO DEL MAÑANA
          </h1>
          <div className="btn-groups flex">
            <button type="button" className="btn-item bg-brown fw-4 ls-2" onClick={handleClick}>
              Iniciar Sesión
            </button>
            {/* <a href="/auth/login" className="aLog">
            <div>Login</div>
          </a> */}
            <button type="button" className="btn-item bg-dark fw-4 ls-2">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bienvenida;
