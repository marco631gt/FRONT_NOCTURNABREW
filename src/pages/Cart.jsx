// src/pages/Cart.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import gallery from "../assets/images/ImagesGallery.png";
import HeaderCart from "../components/HeaderCart";
import Footer from "../components/Footer";
import { useCart } from "../context/Cartcontext";

const API = import.meta.env.VITE_ENDPOINT;

const Cart = () => {
    const navigate = useNavigate();
    const { cart, updateQty, deleteItem, clearCart } = useCart(); // ← AÑADIDO
    console.log("CART DEBUG:", cart);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    // 📌 Enviar orden a Mongo con el formato correcto
    const sendOrderToMongo = async () => {
        const itemsMapped = cart.map(item => ({
            productId: item.id,
            name: item.name,
            qty: item.qty,
            price: item.price,
            subtotal: item.price * item.qty
        }));

        const payload = {
            items: itemsMapped,
            total: total,
            status: "pendiente",
        };

        const res = await fetch(`${API}ticket/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `AppToken ${import.meta.env.VITE_APPSECRET}`,
                "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            console.error("ORDER ERROR:", await res.text());
            throw new Error("Error creating order");
        }

        return await res.json();
    };

    const handleFinishOrder = async () => {
        if (cart.length === 0) {
            setShowPopup(true);
            return;
        }

        setLoading(true);

        try {
            const mongoOrder = await sendOrderToMongo();
            const orderId = mongoOrder?.order?.orderId;

            const orderData = {
                orderId,
                date: new Date().toISOString(),
                items: cart,
                total: Number(total.toFixed(2)),
            };

            console.log("ORDER DATA SENT:", orderData);

            // 👉 GUARDAR ORDEN LOCALMENTE
            const saved = JSON.parse(localStorage.getItem("orders")) || [];
            saved.push(orderData);
            localStorage.setItem("orders", JSON.stringify(saved));

            // 👉👉 LIMPIAR EL CARRITO DESPUÉS DE CREAR LA ORDEN
            clearCart();

            // Navegar al QR
            navigate("/QR", { state: { order: orderData } });

        } catch (err) {
            alert("❌ Could not create the order.");
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <>
            <HeaderCart />

            <section className="categoriesrefresh1">
                <section className="titlecart">
                    <h2>YOUR CART IS:</h2>
                    {cart.length === 0 && <p className="no-products">Your cart is empty</p>}
                </section>

                {cart.length > 0 && (
                    <div className="product-container active">
                        {cart.map((p, i) => (
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
                                    <button className="qty-btn" onClick={() => updateQty(p.id, -1)}>–</button>
                                    <span className="qty-number">{p.qty}</span>
                                    <button className="qty-btn" onClick={() => updateQty(p.id, 1)}>+</button>
                                </div>

                                <button
                                    className="btn-add"
                                    style={{ backgroundColor: "#8b1a1a" }}
                                    onClick={() => deleteItem(p.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="cart-summary-section">
                <div className="cart-summary">
                    <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                    <p><strong>Total + IVA:</strong> ${total.toFixed(2)}</p>
                </div>

                <button
                    className="finish-order-btn"
                    onClick={handleFinishOrder}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Finish Order"}
                </button>
            </section>

            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <h3>Cart Empty</h3>
                        <p>You cannot complete your order because your cart is empty.</p>
                        <button className="popup-btn" onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <section className="gallery">
                <img src={gallery} alt="Gallery" />
            </section>

            <Footer />
        </>
    );
};

export default Cart;
