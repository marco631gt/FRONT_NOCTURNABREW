import React, { useState, useEffect } from "react";
import "./menu.css";
import gallery from "../assets/images/ImagesGallery.png";

import icedFavorites from "../assets/images/icedfavorites.png";
import hotFavorites from "../assets/images/hotfavorites.png";
import sweetDelicacies from "../assets/images/sweetdelicacies.png";
import savoryDelicacies from "../assets/images/savorydelicacies.png";

import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const Menu = () => {
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
    iced: "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/category/Iced%20Favorites",
    hot: "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/category/Hot%20Favorites",
    sweet: "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/category/Sweet%20Delicacies",
    savory: "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/category/Savory%20Delicacies",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoints[activeCategory], {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "AppToken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJNeUFwcCIsImlhdCI6MTc2MjMwNjcyMn0.SdLp7a8txnblULxR1KhEV22XPSR2aPswJU1WM_5wgFc",
            "ngrok-skip-browser-warning": "true", // ⚡️Evita el banner de ngrok
          },
        });

        // 🧩 Capturamos texto crudo para depurar
        const text = await response.text();
        console.log("🔍 Respuesta recibida (texto):", text);

        // Si no es JSON, termina aquí
        if (!response.ok || !text.startsWith("{")) {
          throw new Error("Respuesta no válida o CORS bloqueado");
        }

        // Si sí parece JSON, parseamos
        const data = JSON.parse(text);
        console.log("✅ Datos recibidos:", data);

        if (Array.isArray(data.values)) {
          setProducts(data.values);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("⚠️ Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

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
              <div className="overlay">
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
              </div>
            ))}
          </div>
        ) : (
          <p className="no-products">No products found in this category.</p>
        )}
      </section>

      <section className="gallery">
        <img src={gallery} alt="Gallery" />
      </section>

      <Footer />
    </>
  );
};

export default Menu;
