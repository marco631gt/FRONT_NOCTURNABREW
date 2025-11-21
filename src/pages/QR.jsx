// src/pages/QR.jsx
import React, { useState } from "react";
import "./QR.css";
import gallery from "../assets/images/ImagesGallery.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

import { useLocation } from "react-router-dom";
import Ticket from "../components/Ticket";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const QR = () => {
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();
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

  // ⭐ GENERAR PDF
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
    pdf.save(`Orden-${order.orderId}.pdf`);
  };

  return (
    <>
      <Header2 />

      {/* TÍTULO */}
      <section className="titleqr">
        <h2>QR</h2>
        <p className="Warning">
          With the next QR code you will pay and receive your order:
        </p>
      </section>

      {/* TICKET VISIBLE */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <Ticket order={order} />
      </div>

      {/* ⭐ BOTONES JUNTOS (PDF + CANCELAR) */}
      <div className="buttons-container">
        <button className="download-btn" onClick={generarPDF}>
          Download Receipt
        </button>

        <button
          className="cancel-btn"
          onClick={() => setShowPopup(true)}
        >
          Cancel Order
        </button>
      </div>

      {/* TICKET OCULTO PARA PDF */}
      <div id="ticket-pdf" style={{ position: "absolute", left: "-9999px" }}>
        <Ticket order={order} />
      </div>

      {/* GALERÍA */}
      <section className="gallery">
        <img src={gallery} alt="Gallery" />
      </section>

      {/* POPUP DE CONFIRMACIÓN */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Are you sure you want to cancel the order?</h3>

            <div className="popup-buttons">
              <a href="/menu" className="yes">
                Yes, cancel
              </a>

              <button
                className="no"
                onClick={() => setShowPopup(false)}
              >
                No, keep order
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default QR;
