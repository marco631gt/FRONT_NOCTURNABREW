import React, { useState, useEffect } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import icedFavorites from "../assets/images/icedfavorites.png";
import hotFavorites from "../assets/images/hotfavorites.png";
import sweetDelicacies from "../assets/images/sweetdelicacies.png";
import savoryDelicacies from "../assets/images/savorydelicacies.png";

import "./productmanagement.css";

const ProductManagement = () => {
  const categories = [
    { id: "iced", title: "ICED FAVORITES", image: icedFavorites },
    { id: "hot", title: "HOT FAVORITES", image: hotFavorites },
    { id: "sweet", title: "SWEET DELICACIES", image: sweetDelicacies },
    { id: "savory", title: "SAVORY DELICACIES", image: savoryDelicacies },
  ];

  const endpoints = {
    iced: `${import.meta.env.VITE_ENDPOINT}products/category/Iced%20Favorites`,
    hot: `${import.meta.env.VITE_ENDPOINT}products/category/Hot%20Favorites`,
    sweet: `${import.meta.env.VITE_ENDPOINT}products/category/Sweet%20Delicacies`,
    savory: `${import.meta.env.VITE_ENDPOINT}products/category/Savory%20Delicacies`,
  };

  const [selectedCategory, setSelectedCategory] = useState("iced");
  const [products, setProducts] = useState([]);

  // Cargar productos cada vez que cambia la categoría
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(endpoints[selectedCategory]);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="product-management-container">
      <Header2 />

      <div className="product-management-content">
        <h2 className="pm-title">Product Management</h2>

        {/* Botón para crear producto */}
        <div className="pm-add-container">
          <Link to="/createproduct" className="pm-add-btn">+</Link>
        </div>

        {/* Categorías */}
        <div className="pm-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`pm-category-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <img src={cat.image} alt={cat.title} className="pm-category-img" />
              {cat.title}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="pm-products-grid">
          {products.length === 0 ? (
            <p className="pm-empty">No products found in this category.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="pm-product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="pm-product-img"
                />

                <h3 className="pm-product-name">{product.name}</h3>
                <p className="pm-product-price">${product.price}</p>

                <Link to={`/editproduct/${product._id}`} className="pm-edit-btn">
                  Edit Product
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductManagement;
