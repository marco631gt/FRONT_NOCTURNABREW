import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

// Imágenes
import registerBg from "../assets/images/register-bg.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};

    // Validar nombre
    if (!name.trim()) {
      newError.name = "Name is required";
    } else if (!/^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/.test(name)) {
      newError.name = "Only letters and spaces allowed";
    }

    // Validar email
    if (!email.trim()) {
      newError.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) {
      newError.email = "Email has an invalid format or extension";
    }

    // Validar password
    if (!password.trim()) {
      newError.password = "Password is required";
    } else if (password.length < 6) {
      newError.password = "Password must be at least 6 characters long";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleRegister = async () => {
  if (!validate()) {
    console.log("Errores en los campos");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_ENDPOINT}users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_APPSECRET}`, 
      },
      body: JSON.stringify({ name, email, password }),
    });

    const text = await res.text(); // leer como texto para depurar
    console.log("🔍 Respuesta recibida (texto):", text);

    const data = JSON.parse(text);
    console.log("✅ Datos recibidos:", data);

    if (res.ok) {
      alert("✅ Registro exitoso");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert(`⚠️ ${data.message || "Error al registrar usuario"}`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert("Error al conectar con el servidor");
  }
};


  return (
    <>
      <Header2 />
      <section
        className="background"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="overlay">
          <div className="login-box">
            <h2>SIGN UP</h2>

            {/* Nombre */}
            <div className={`input-group ${error.name ? "error" : ""}`}>
              <i className="icon">👤</i>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {error.name && <span className="error-message">{error.name}</span>}

            {/* Email */}
            <div className={`input-group ${error.email ? "error" : ""}`}>
              <i className="icon">📧</i>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error.email && <span className="error-message">{error.email}</span>}

            {/* Password */}
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
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {error.password && (
              <span className="error-message">{error.password}</span>
            )}

            {/* Botón */}
            <button className="btn-createaccount" onClick={handleRegister}>
              Create an Account
            </button>

            {/* Enlace a login */}
            <p className="login-link">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

// 🔹 Muy importante: esto debe estar al final del archivo
export default Register;