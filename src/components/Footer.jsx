import React from "react";
import "../pages/Landing.css";

import phone from "../assets/images/phone.png";
import email from "../assets/images/email.png";
import linki from "../assets/images/linki.png";
import linkf from "../assets/images/linkf.png";
import linkw from "../assets/images/linkw.png";

const Footer = () => {
  return (
    <footer>
      <div className="contact">
        <h3>CONTACT US</h3>
        <p className="phone">
          <img src={phone} alt="phone" /> 000 000 0001
        </p>
        <p className="mail">
          <img src={email} alt="email" /> tuopinion@nocturnabrew.com.mx
        </p>
      </div>
      <div className="socials">
        <a href="https://www.instagram.com/">
          <img src={linki} alt="Instagram" />
        </a>
        <a href="https://www.facebook.com/">
          <img src={linkf} alt="Facebook" />
        </a>
        <a href="https://www.whatsapp.com/">
          <img src={linkw} alt="Whatsapp" />
        </a>
        <p>© 2025 Nocturna Brew. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
