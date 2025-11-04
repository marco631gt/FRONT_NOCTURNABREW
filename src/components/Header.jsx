import React from "react";
import "../pages/Landing.css"; // reutilizamos los estilos del Landing

import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Nocturna Brew Logo" />
      </div>
      <nav>
        <a href="#">Menú</a>
        <a href="#">Login</a>
        <a href="#">Join Us</a>
        <a href="#">About Us</a>
      </nav>

     
    </header>
  );
};

export default Header;
