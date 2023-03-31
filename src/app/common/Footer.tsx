import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import "../styles/Footer.css";
export const Footer = () => {
  return (
    <div className="footer" data-background-color="gray">
      <div className="container" data-gray-color="gray">
        <a className="foot-brand" href="#creative">Cities & Maiki</a>
          <ul className="pull-center">
            <li>
              <a href="#" className="nav-link">Proyectos</a>
            </li>
            <li>
              <a href="#" className="nav-link">Paginadores</a>
            </li>
            <li>
              <a href="#" className="nav-link">Informacion</a>
            </li>
            <li>
              <a href="#" className="nav-link">Sobre Nosotros</a>
            </li>
          </ul>

          <ul className="social-buttons pull-right">
            <li>
              <a href="#" className="btn btn-icon btn-neutral btn-twitter">
                <i className="fa fa-twitter"/>
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-icon btn-neutral btn-dribbble">
                <i className="fa fa-dribbble"/>
              </a>
            </li>
            <li>
              <a href="#" className="btn btn-icon btn-neutral btn-google">
                <i className="fa fa-google-plus"/>
              </a>
            </li>
          </ul>
      </div>
    </div>
  );
}