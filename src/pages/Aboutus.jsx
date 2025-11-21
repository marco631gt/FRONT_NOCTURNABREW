import React from "react";
import "./Aboutus.css";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


import logo from "../assets/images/logo.png";
import coffeecup from "../assets/images/coffeecup.png";
import coffeecup2 from "../assets/images/coffecup2.png";
import coffee from "../assets/images/coffee.png";
import gallery from "../assets/images/ImagesGallery.png";
import phone from "../assets/images/phone.png";
import email from "../assets/images/email.png";
import linki from "../assets/images/linki.png";
import linkf from "../assets/images/linkf.png";
import linkw from "../assets/images/linkw.png";


export default function Aboutus() {
  return (
    <>
      <div className="font-[Poppins]">

        {/* HEADER */}
        <header className="flex justify-between items-center p-4 shadow-md bg-white">
           
          <div className="logo w-28">
            <Link to="/">
            <img src={logo} alt="Nocturna Brew Logo" />
      </Link>
      </div>

          <nav className="flex gap-6 text-lg">
            <a href="/menu" className="hover:underline">Menú</a>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/register" className="hover:underline">Join Us</a>
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

  {/* CONTENIDO CENTRADO */}
    <div className="hero-textabout">
  <h1>ABOUT</h1>
  <h2>NOCTURNA BREW</h2>
  <p>
    At Nocturna Brew, we believe that coffee is more than a drink —
    it's a ritual under the moonlight.
  </p>
</div>

    {/* IMAGEN DERECHA (POSICIONADA COMO EN LA IMAGEN) */}
    <div className="hero-imgabout">
      <img src={coffeecup} />
    </div>
</section>



        {/* OUR INFORMATION */}
        <section className="our-informationabout max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img src={coffeecup2} alt="Taza de café 2" className="w-80 mx-auto" />

          <div className="info-text text-lg leading-relaxed">
            <p>
              Born from sleepless nights and quiet inspiration, our café blends the
              mystery of the night with the warmth of good company.
            </p>

            <p className="mt-4">
              Every cup we serve carries a story — roasted to perfection, poured with
              care, and meant to awaken not just your senses, but your spirit.
            </p>

            <p className="mt-4">
              From handcrafted cold brews to cozy moonlit lattes — every detail is
              made to match the rhythm of the night.
            </p>
          </div>
        </section>

        {/* LAST INFO */}
        <section className="last-informationabout max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="info-text2 text-xl italic">
            <p>
              ✨ Because at Nocturna Brew, we don’t just serve coffee — we serve calm,
              creativity, and connection under the stars. 🌙
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
