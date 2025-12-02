import React from "react";
import "./Aboutus.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../utils/logout";

import logo from "../assets/images/logo.png";
import coffeecup from "../assets/images/coffeecup.png";
import coffeecup2 from "../assets/images/coffecup2.png";
import coffee from "../assets/images/coffee.png";
import gallery from "../assets/images/ImagesGallery.png";

export default function Aboutus() {
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => logout(navigate);

  return (
    <>
      <div className="font-[Poppins]">

        {/* HEADER FUSIONADO (DISEÑO DE Header2) */}
        <header className="main-header">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Nocturna Brew Logo" />
            </Link>
          </div>

          <nav
            style={{
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Link to="/login">Menú</Link>

            {!isLogged && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Join Us</Link>
              </>
            )}

            {isLogged && (
              <>
                {userRole === "administrator" && (
                  <Link to="/AdminPanel">Admin</Link>
                )}

                {/* Ícono de cerrar sesión (con tu nueva imagen) */}
                <button
                  onClick={handleLogout}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "8px",
                    padding: 0,
                  }}
                >
                  <img
                    src="https://i.imgur.com/q4KEEu7.png"
                    alt="Logout"
                    style={{
                      width: "28px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                  />
                </button>
              </>
            )}
          </nav>

        </header>

        {/* HERO */}
        <section className="relative overflow-hidden bg-[#550B14] text-white pb-20">
          <svg
            className="absolute top-0 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 120 1600 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,160 C400,260 1300,60 1600,180 C1600,180 1600,260 1600,260 C1200,140 400,340 0,240 Z"
              fill="#550B14"
            />
          </svg>

          <div className="hero-textabout">
            <h1>ABOUT</h1>
            <h2>NOCTURNA BREW</h2>
            <p>
              At Nocturna Brew, we believe that coffee is more than a drink —
              it's a ritual under the moonlight.
            </p>
          </div>

          <div className="hero-imgabout">
            <img src={coffeecup} />
          </div>
        </section>

        {/* OUR INFORMATION */}
        <section className="our-informationabout max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img src={coffeecup2} alt="Taza de café 2" className="w-80 mx-auto" />

          <div className="info-text text-lg leading-relaxed">
            <p>
              Born from sleepless nights and quiet inspiration, our café blends
              the mystery of the night with the warmth of good company.
            </p>

            <p className="mt-4">
              Every cup we serve carries a story — roasted to perfection, poured
              with care, and meant to awaken not just your senses, but your
              spirit.
            </p>

            <p className="mt-4">
              From handcrafted cold brews to cozy moonlit lattes — every detail
              is made to match the rhythm of the night.
            </p>
          </div>
        </section>

        {/* LAST INFO */}
        <section className="last-informationabout max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="info-text2 text-xl italic">
            <p>
              ✨ Because at Nocturna Brew, we don’t just serve coffee — we serve
              calm, creativity, and connection under the stars. 🌙
            </p>
          </div>

          <img src={coffee} alt="Coffee cup" className="w-72 mx-auto" />
        </section>

        {/* GALLERY */}
        <section className="gallery w-full flex justify-center py-10">
          <img src={gallery} alt="Gallery" className="w-[90%] max-w-4xl" />
        </section>

        <Footer />
      </div>
    </>
  );
}
