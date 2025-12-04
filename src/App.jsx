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
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* 🔒 TODAS ESTAS RUTAS SON SOLO PARA ADMIN */}
      <Route
        path="/Createproduct"
        element={
          <ProtectedRoute>
            <Createproduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Productmanagement"
        element={
          <ProtectedRoute>
            <Productmanagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/UserManagement"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Updateproduct"
        element={
          <ProtectedRoute>
            <Updateproduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Updateproduct/:id"
        element={
          <ProtectedRoute>
            <Updateproduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Createingredient"
        element={
          <ProtectedRoute>
            <Createingredient />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
