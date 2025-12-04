// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import HeaderOrders from "../components/HeaderOrders";
import Footer from "../components/Footer";
import "./MyOrder.css";

const API = import.meta.env.VITE_ENDPOINT;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  // 🔥 Estado para popup de confirmación
  const [confirmPopup, setConfirmPopup] = useState({
    show: false,
    orderId: null
  });

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

  // 🔥 Abrir popup
  const openConfirmPopup = (orderId) => {
    setConfirmPopup({ show: true, orderId });
  };

  // 🔥 Confirmar Sí
  const confirmCancel = async () => {
    await cancelLocalOrder(confirmPopup.orderId);
    setConfirmPopup({ show: false, orderId: null });
  };

  // 🔥 Cancelar No
  const closePopup = () => {
    setConfirmPopup({ show: false, orderId: null });
  };

  return (
    <>
      {/* 🔥 POPUP DE CONFIRMACIÓN */}
      {confirmPopup.show && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Cancel Order</h3>
            <p>Are you sure you want to cancel this order?</p>

            <div className="popup-buttons">
              <button className="confirm-yes" onClick={confirmCancel}>Yes</button>
              <button className="confirm-no" onClick={closePopup}>No</button>
            </div>
          </div>
        </div>
      )}

      <HeaderOrders />

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
                onClick={() => openConfirmPopup(order.orderId)}
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
