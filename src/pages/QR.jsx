// src/pages/QR.jsx
import React, { useState } from "react";
import "./QR.css";
import gallery from "../assets/images/ImagesGallery.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Ticket from "../components/Ticket";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCart } from "../context/Cartcontext";

const API = import.meta.env.VITE_ENDPOINT;

const QR = () => {
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();   // <-- 🟢 importar función para vaciar carrito

  const order = location.state?.order;

  if (!order)
    return (
      <>
        <Header2 />
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>
          No order data received.
        </h2>
        <Footer />
      </>
    );

  // Descargar PDF
  const generarPDF = async () => {
    const elemento = document.getElementById("ticket-pdf");

    const canvas = await html2canvas(elemento, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [350, 600],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 350, 600);
    pdf.save(`Orden-${order.orderNumber}.pdf`);
  };

  // Cancelar orden → actualizar estado + vaciar carrito
  const cancelarOrden = async () => {
    try {
      const id = order.orderId || order.ticket?.orderId;

      if (!id) {
        alert("Error: orderId not found.");
        return;
      }

      const res = await fetch(`${API}ticket/updateStatus/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `AppToken ${import.meta.env.VITE_APPSECRET}`,
          "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ status: "canceled" })
      });

      if (!res.ok) throw new Error(await res.text());

      // 🧹 Vaciar carrito aquí
      clearCart();

      alert("Order canceled successfully.");
      navigate("/menu");
    } catch (err) {
      console.error(err);
      alert("Error canceling order.");
    }
  };

  return (
    <>
      <Header2 />

      <section className="titleqr">
        <h2>QR</h2>
        <p className="Warning">
          With the next QR code you will pay and receive your order:
        </p>
      </section>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Ticket order={order} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "35px" }}>
        <button className="cancel-btn" onClick={generarPDF}>
          Descargar PDF
        </button>

        <button
          className="cancel-btn"
          style={{ backgroundColor: "#8b1515" }}
          onClick={() => setShowPopup(true)}
        >
          Cancel Order
        </button>
      </div>

      <div id="ticket-pdf" style={{ position: "absolute", left: "-9999px" }}>
        <Ticket order={order} />
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Are you sure you want to cancel the order?</h3>

            <div className="popup-buttons">
              <button className="yes" onClick={cancelarOrden}>Yes, cancel</button>
              <button className="no" onClick={() => setShowPopup(false)}>No, keep order</button>
            </div>
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

export default QR;
