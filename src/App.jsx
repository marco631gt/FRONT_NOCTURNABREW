import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Aboutus from "./pages/Aboutus";
import Createproduct from "./pages/Createproduct";
import Cart from "./pages/Cart";
import QR from "./pages/QR";
import AdminPanel from "./pages/AdminPanel";
import Productmanagement from "./pages/Productmanagement";
import Usermanagement from "./pages/Usermanagement";

// 🔒 Función para verificar rol:
const isAdmin = () => {
  return localStorage.getItem("userRole") === "administrator";
};


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/QR" element={<QR />} />

        {/* 🔥 PROTECCIÓN DE RUTA ADMIN */}
        <Route path="/AdminPanel" element={isAdmin() ? <AdminPanel /> : <Navigate to="/login" />}/>
        <Route path="/Createproduct" element={<Createproduct />} />
        <Route path="/Productmanagement" element={<Productmanagement />} />
        <Route path="/Usermanagement" element={<Usermanagement />} />
      </Routes>
    </>
  );
}

export default App;
