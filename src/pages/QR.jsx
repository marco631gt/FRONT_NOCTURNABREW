import React, { useState } from "react";
import "./QR.css";
import gallery from "../assets/images/ImagesGallery.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const QR = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Header2 />
      <section className="titleqr">
        <h2>QR</h2>
        <p className="Warning">
          With the next QR code you will pay and receive your order:
        </p>
      </section>

      {/* Botón de cancelar orden */}
      <div className="cancel-container">
        <button
          className="cancel-btn"
          onClick={() => setShowPopup(true)}
        >
          Cancel Order
        </button>
      </div>

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
