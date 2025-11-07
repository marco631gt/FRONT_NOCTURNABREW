import React, { useState } from "react";
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";

// Imágenes
import registerBg from "../assets/images/register-bg.png";
import HeaderLog from "../components/HeaderLog";
import Footer from "../components/Footer";

const Login = () => {
  const navigate =useNavigate();
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
    console.log('Hola')
     console.log( Object.keys(newError) )
     console.log( Object.keys(newError).length )
    return Object.keys(newError).length === 0;
  };

  const handleLogin = async () => {
  if (!validate()) {
    console.log("Campos inválidos");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_ENDPOINT}login`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_APPSECRET}`,
  },
  body: JSON.stringify({ email, password }),
});


    const data = await res.json();

    if (res.ok) {
      
      setEmail("");
      setPassword("");
      navigate("/Menu");
    } else {
      alert(`⚠️ ${data.msg || "Error en el inicio de sesión"}`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    //alert("Error al conectar con el servidor");
  }
};


  return (
    <>
      <HeaderLog />

      {/* BACKGROUND */}
      <section
        className="background"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="overlay-login">
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
            {error.email && <span className="error-message" style={{color:"white"}}>{error.email}</span>}

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
            {error.password && <span className="error-message" style={{color:"white"}}>{error.password}</span>}

          {/* BOTONES */}
            <button className="btn primary" onClick={handleLogin}>
              Log In
            </button>
            <Link to="/register">
              <button className="btn secondary">Create an Account</button>
            </Link>
            </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;