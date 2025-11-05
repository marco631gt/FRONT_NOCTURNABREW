import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

// Imágenes
import logo from "../assets/images/logo.png";
import phone from "../assets/images/phone.png";
import emailImg from "../assets/images/email.png";
import linki from "../assets/images/linki.png";
import linkf from "../assets/images/linkf.png";
import linkw from "../assets/images/linkw.png";
import registerBg from "../assets/images/register-bg.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};

    // Validación email
    if (!email.trim()) {
      newError.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) {
      newError.email = "Email has an invalid format or extension";
    }

    // Validación password
    if (!password.trim()) {
      newError.password = "Password is required";
    } else if (password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
    }

    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      console.log("Login correcto");
    } else {
      console.log("Campos inválidos");
    }
  };

  return (
    <>
      <Header2 />

      {/* BACKGROUND */}
      <section
        className="background"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="overlay">
          <div className="login-box">
            <h2>LOG IN</h2>

            {/* EMAIL */}
            <div className={`input-group ${error.email ? "error" : ""}`}>
              <i className="icon">📧</i>
              <input
                type="email"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error.email && <span className="error-message">{error.email}</span>}

            {/* PASSWORD */}
            <div className={`input-group ${error.password ? "error" : ""}`}>
              <i className="icon">🔒</i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {error.password && <span className="error-message">{error.password}</span>}

            {/* CONTRASEÑA OLVIDADA Y conexión a register*/}
            <p className="forgot">
              If you forgot your password,{" "}
              <Link to="/register"> click here </Link>
            </p>

            {/* BOTONES */}
            <button className="btn primary" onClick={handleLogin}>
              Log In
            </button>
            <button className="btn secondary">Create an Account</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;