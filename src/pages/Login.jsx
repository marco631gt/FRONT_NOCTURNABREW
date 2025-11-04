import React, { useState } from "react";
import "./Login.css";

// Imágenes
import logo from "../assets/images/logo.png";
import phone from "../assets/images/phone.png";
import email from "../assets/images/email.png";
import linki from "../assets/images/linki.png";
import linkf from "../assets/images/linkf.png";
import linkw from "../assets/images/linkw.png";
import registerBg from "../assets/images/register-bg.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <> <Header2/>

      {/* Fondo */}
      <section
        className="background"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="overlay">
          <div className="login-box">
            <h2>LOG IN</h2>

            <div className="input-group">
              <i className="icon">📧</i>
              <input type="email" placeholder="e-mail" />
            </div>

            <div className="input-group">
              <i className="icon">🔒</i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <p className="forgot">If you forgot your password, click here</p>

            <button className="btn primary">Log In</button>
            <button className="btn secondary">Create an Account</button>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default Login;
