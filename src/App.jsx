import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Aboutus from "./pages/Aboutus";
import Createproduct from "./pages/Createproduct";
import Updateproduct from "./pages/Updateproduct";
import Cart from "./pages/Cart";
import QR from "./pages/QR";
import AdminPanel from "./pages/AdminPanel";
import Productmanagement from "./pages/Productmanagement";
import UserManagement from "./pages/UserManagement";
import Createingredient from "./pages/Createingredient";
import MyOrders from "./pages/MyOrders";

import ProtectedRoute from "./utils/ProtectedRoute";

// Verificar rol admin
const isAdmin = () => localStorage.getItem("userRole") === "administrator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/QR" element={<QR />} />

      {/* 🔒 PROTEGER MY ORDERS */}
      <Route
        path="/MyOrders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      {/* 🔒 PROTEGER PANEL DE ADMIN */}
      <Route
        path="/AdminPanel"
        element={
          isAdmin() ? (
            <AdminPanel />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/Createproduct" element={<Createproduct />} />
      <Route path="/Productmanagement" element={<Productmanagement />} />
      <Route path="/UserManagement" element={<UserManagement />} />
      <Route path="/Updateproduct" element={<Updateproduct />} />
      <Route path="/Updateproduct/:id" element={<Updateproduct />} />
      <Route path="/Createingredient" element={<Createingredient />} />
    </Routes>
  );
}

export default App;
