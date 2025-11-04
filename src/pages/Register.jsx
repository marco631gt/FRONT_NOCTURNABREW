import React, { useState } from "react";
import "./Register.css";

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

const Register = () => {
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
            <h2>SING UP</h2>

            <div className="input-group">
              <i className="icon">📧</i>
              <input type="name" placeholder="name" />
            </div>

            <div className="input-group">
              <i className="icon">📧</i>
              <input type="email" placeholder="email" />
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

            <button className="btn-createaccount">Create an Account</button>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default Register;
