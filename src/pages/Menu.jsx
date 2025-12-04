import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";
import gallery from "../assets/images/ImagesGallery.png";
import shoppingcart from "../assets/images/shopping-cart.png";

import icedFavorites from "../assets/images/icedfavorites.png";
import hotFavorites from "../assets/images/hotfavorites.png";
import sweetDelicacies from "../assets/images/sweetdelicacies.png";
import savoryDelicacies from "../assets/images/savorydelicacies.png";

import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { useCart } from "../context/Cartcontext";

const Menu = () => {
  const navigate = useNavigate();

  const { addToCart, cart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const [activeCategory, setActiveCategory] = useState("iced");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoints[activeCategory], {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `AppToken ${import.meta.env.VITE_APPSECRET}`,
            "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        const text = await response.text();
        console.log(" Respuesta recibida (texto):", text);

        if (!response.ok || !text.startsWith("{")) {
          throw new Error("Respuesta no válida");
        }

        const data = JSON.parse(text);
        console.log("Datos recibidos:", data);

        if (Array.isArray(data.values)) {
          setProducts(data.values.map((p) => ({ ...p, qty: 0 })));
        } else if (Array.isArray(data)) {
          setProducts(data.map((p) => ({ ...p, qty: 0 })));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const updateQty = (index, increment) => {
    setProducts((prev) => {
      const copy = [...prev];
      const newQty = (copy[index].qty || 0) + increment;

      const finalQty = Math.max(0, Math.min(10, newQty));

      copy[index] = {
        ...copy[index],
        qty: finalQty,
      };

      return copy;
    });
  };

  return (
    <>
      <Header2 />

      <section className="categoriesrefresh">
        <h2>OUR TEMPTATIONS</h2>

        <div className="cards">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`card ${activeCategory === cat.id ? "selected" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <img src={cat.image} alt={cat.title} />
              <div className="overlay-menu">
                <h3>{cat.title}</h3>
                <p>View more</p>
              </div>
            </div>
          ))}
        </div>

        <h3>
          <span className="color2">Refresh your life...</span>
        </h3>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p style={{ color: "black" }}>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="product-container active">
            {products.map((p, i) => (
              <div className="product-card" key={i}>
                {p.url && (
                  <img
                    src={p.url}
                    alt={p.name}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <h4>{p.name}</h4>
                <p>{p.description}</p>
                <p className="price">${p.price}</p>

               

                <div className="qty-container">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(i, -1)}
                  >
                    –
                  </button>

                  <span className="qty-number">{p.qty}</span>

                  <button
                    className="qty-btn"
                    onClick={() => updateQty(i, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                className="btn-add"
                disabled={!p.available || p.qty === 0}
                style={{
                  opacity: !p.available ? 0.5 : 1,
                  cursor: !p.available ? "not-allowed" : "pointer"
                }}
                onClick={() => {
                  if (p.available && p.qty > 0) {
                    addToCart(p);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                  }
                }}
              >
                {p.available ? "Add to Cart" : "Not Available"}
              </button>

              </div>
            ))}
          </div>
        ) : (
          <p className="no-products" style={{ color: "black" }}>No products found in this category.</p>
        )}
      </section>

      <section className="gallery">
        <img src={gallery} alt="Gallery" />
      </section>
      <button onClick={() => navigate("/cart", { state: { cart } })} className="go-cart-btn">
        <img src={shoppingcart} />
      </button>

      {showToast && (
        <div className="toast-added">
          Product added
        </div>
      )}

      <Footer />
    </>
  );
};

export default Menu;
