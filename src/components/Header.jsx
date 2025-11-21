import React from "react";
import { Link } from "react-router-dom";
import "../pages/Landing.css"; // reutilizamos los estilos del Landing
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="logo">
       <Link to="/">
        <img src={logo} alt="Nocturna Brew Logo" />
      </Link>
        
      </div>
      <nav>
        <Link to="/menu">Menú</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Join Us</Link>
        <Link to="/aboutus">About Us</Link>
      </nav>

     
    </header>
  );
};

export default Header;
