import React from "react";
import "../../../styles/Home.css";
//npm i -d sass - INSTALAR para usar el menu
const Home = () => {
  //24-02-23
  return (
    <div>
      <div className="home">
        <div className="welcome">
        <h2>Bienvenido a nuestra tienda tecnológica</h2>
        <p>Encuentra los últimos productos tecnológicos, desde smartphones y laptops hasta televisores y 
          cámaras de alta definición. Nuestro sitio web está diseñado para ser fácil de usar y encontrar lo que necesitas. 
          Ofrecemos envío gratuito en todos los pedidos y garantizamos la calidad de nuestros productos.</p>
      </div>
      </div>
    </div>
  );
}
export default Home;
