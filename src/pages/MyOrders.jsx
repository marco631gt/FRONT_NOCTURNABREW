// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import "./MyOrder.css";

const API = import.meta.env.VITE_ENDPOINT;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved);
  }, []);

  // 🔥 Cancelar en Mongo igual que en QR.jsx
  const cancelOrderInMongo = async (orderId) => {
    try {
      const res = await fetch(`${API}ticket/updateStatus/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `AppToken ${import.meta.env.VITE_APPSECRET}`,
          "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ status: "canceled" }),
      });

      if (!res.ok) throw new Error(await res.text());
      return true;

    } catch (err) {
      console.error("❌ Error canceling order in Mongo:", err);
      alert("Error canceling order.");
      return false;
    }
  };

  // 🔥 Cancela en Mongo y luego en localStorage
  const cancelLocalOrder = async (orderId) => {
    const ok = await cancelOrderInMongo(orderId);
    if (!ok) return;

    const updated = orders.map(o =>
      o.orderId === orderId ? { ...o, status: "canceled" } : o
    );

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  return (
    <>
      <Header2 />

      <div className="orders-container">
        <h2>Your Orders</h2>

        {orders.length === 0 && <p>No orders found.</p>}

        {orders.map(order => (
          <div key={order.orderId} className="order-card">
            <h3>Order: {order.orderId}</h3>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status || "pending"}</p>

            <h4>Items:</h4>
            <ul>
              {order.items.map((i, idx) => (
                <li key={idx}>
                  {i.qty} × {i.name} — ${i.price}
                </li>
              ))}
            </ul>

            {order.status !== "canceled" && (
              <button
                className="cancel-btn"
                onClick={() => cancelLocalOrder(order.orderId)}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default MyOrders;
