// src/components/Header2.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../pages/Login.css";
import { logout } from "../utils/logout";

const Header2 = () => {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Nocturna Brew Logo" />
        </Link>
      </div>

      <nav style={{ zIndex: 100, display: "flex", alignItems: "center", gap: "15px" }}>
        <Link to="/MyOrders">My Orders</Link>

        <Link to="/aboutus">About Us</Link>


        {!isLogged && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Join Us</Link>
          </>
        )}

        {isLogged && (
          <>
            {userRole === "administrator" && <Link to="/AdminPanel">Admin</Link>}

            {/* Ícono de cerrar sesión */}
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                marginLeft: "8px",
                padding: 0,
              }}
            >
              <img
                src="https://i.imgur.com/a0Kbs50.png"
                alt="Logout"
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "contain",
                  filter: "none", // lo hace blanco para el header oscuro
                }}
              />
            </button>
          </>
        )}

      </nav>

      <svg className="curve" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
        <path fill="#5a0c17" d="M0,0 C360,150 1080,-30 1440,60 L1440,0 L0,0 Z"></path>
      </svg>
    </header>
  );
};

export default Header2;
