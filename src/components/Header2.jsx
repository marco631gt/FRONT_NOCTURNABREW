import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../pages/Login.css";

const Header2 = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Nocturna Brew Logo" />
        </Link>
      </div>
      <nav style={{ zIndex: 100 }}>
        <Link to="/menu">Menú</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Join Us</Link>
        <Link to="/aboutus">About Us</Link>
      </nav>

      {/* Curva SVG */}
      <svg className="curve" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
        <path fill="#5a0c17" d="M0,0 C360,150 1080,-30 1440,60 L1440,0 L0,0 Z"></path>
      </svg>
    </header>
  );
};

export default Header2;
