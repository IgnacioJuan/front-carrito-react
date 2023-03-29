import React from "react";
import "../styles/Footer.css";
//npm i -d sass - INSTALAR para usar el menu
const Footer = () => {
  //24-02-23
  return (
    <div>
      <html>
        <body>
          <footer className="footer section" id="foot">
            <div className="footer__container container grid">
              <div className="footer__content">
                <a
                  href="https://goo.gl/maps/p52hmMxoGnToaB5D7"
                  target="_blank"
                  className="footer__logo"
                >
                  Av. Américas Sector Entrada La Católica
                </a>
                <p className="footer__description">Od. Jonnathan SanMartin</p>

                <div className="footer__social">
                  <a
                    href="https://www.facebook.com/profile.php?id=100088220704362"
                    target="_blank"
                    className="footer__social-link"
                  >
                    <i className="bx bxl-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/sm__odontologia/?fbclid=IwAR2l-7dgpuh5p3f2v7xvOdSOWfzKM3rI6MOGq_CKTN86CFW7eVxXtBREILcm"
                    target="_blank"
                    className="footer__social-link"
                  >
                    <i className="bx bxl-instagram-alt"></i>
                  </a>
                  <a
                    href="https://wa.me/0990369421"
                    target="_blank"
                    className="footer__social-link"
                  >
                    <i className="bx bxl-whatsapp"></i>
                  </a>
                </div>
              </div>

              <div className="footer__content">
                <h3 className="footer__title">
                  Odontología General y Preventiva
                </h3>
              </div>

              <div className="footer__content">
                <ul className="footer__links">
                  <li>
                    <a className="footer__link">- Restauraciones</a>
                  </li>
                  <li>
                    <a className="footer__link">- Profilaxis</a>
                  </li>
                  <li>
                    <a className="footer__link">- Diagnóstico</a>
                  </li>
                  <li>
                    <a className="footer__link">- Prótesis Dentales</a>
                  </li>
                  <li>
                    <a className="footer__link">- Blanqueamiento</a>
                  </li>
                </ul>
              </div>

              <div className="footer__content">
                <ul className="footer__links">
                  <li>
                    <a className="footer__link">- Odontopediatría</a>
                  </li>
                  <li>
                    <a className="footer__link">- Endodoncia</a>
                  </li>
                  <li>
                    <a className="footer__link">- Ortodoncia</a>
                  </li>
                  <li>
                    <a className="footer__link">- Extracciones</a>
                  </li>
                  <li>
                    <a className="footer__link">- Cirugía</a>
                  </li>
                </ul>
              </div>
            </div>

            <span className="footer__copy">&#169; Derechos Reservados</span>
            <div className="footer__img-one"></div>
            <div className="footer__img-two"></div>
          </footer>
        </body>
      </html>
    </div>
  );
};

export default Footer;