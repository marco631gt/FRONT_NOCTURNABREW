import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Aboutus from "./pages/Aboutus";
import Cart from "./pages/Cart";



function App() {
  return (
    <>

    
      {/* Rutas */}
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<Aboutus />} />
        
        
      </Routes>
    </>
  );
}

export default App;
