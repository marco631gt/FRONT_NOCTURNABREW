import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

// Componentes reutilizables
import HeaderLanding from "../components/HeaderLanding";
import Footer from "../components/Footer";

// Imágenes
import coffeecup from "../assets/images/coffeecup.png";
import backourcoffe from "../assets/images/backourcoffe.png";
import coldbrew from "../assets/images/coldbrew.png";
import capuccino from "../assets/images/capuccino.png";
import cheesecake from "../assets/images/cheesecake.png";
import ImagesGallery from "../assets/images/ImagesGallery.png";

const Landing = () => {
  return (
    <>
    <HeaderLanding/>
      {/* HERO */}
      <section className="hero">
        <svg
          className="hero-bg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1712 801"
          preserveAspectRatio="none"
        >
          <path
            d="M1711.73 786.344C1711.73 786.344 1876.59 437.241 1711.73 193.424C1432.16 -220.04 736.982 163.701 388.5 137.908C40.0178 112.115 -0.184357 44.2439 -0.184357 44.2439C-0.184357 44.2439 -296.77 696.471 -0.184357 764.014C531.788 885.164 874.094 665.793 1359 665.793C1623.99 665.793 1711.73 786.344 1711.73 786.344Z"
            fill="#550B14"
          />
        </svg>

        <div className="hero-content">
          <h2>NOCTURNA BREW</h2>
          <p>
            The perfect harmony of desserts, drinks, and temptations your night deserves.
          </p>
        </div>

        <div className="hero-img">
          <img src={coffeecup} alt="Taza de café" />
        </div>
      </section>

      {/* OUR COFFEE */}
      <section
        className="our-coffee"
        style={{ backgroundImage: `url(${backourcoffe})` }}
      >
        <h2>We are your perfect choice.</h2>
        <div className="coffee-cards">
          <div className="coffee-item">
            <h3>"EVERY CUP HAS A SOUL."</h3>
            <p>
              Nocturna Brew was created to offer authentic coffee experiences, blending tradition and modernity while supporting small producers.
            </p>
          </div>
          <div className="coffee-item">
            <h3>"GOOD COFFEE, GOOD CONSCIENCE."</h3>
            <p>
              Our coffee promotes quality, human connection, and sustainability at every step from harvest to responsible consumption.
            </p>
          </div>
          <div className="coffee-item">
            <h3>"STAY AWHILE, THE NIGHT IS YOUNG."</h3>
            <p>
              A cozy space to work, socialize, or relax, enjoying great coffee, friendly service, and an atmosphere that feels like home.
            </p>
          </div>
        </div>
      </section>

      {/* OUR TEMPTATIONS */}
      <section className="temptations">
        <h2>OUR TEMPTATIONS</h2>
        <div className="temptation-cards">
          <div
            className="card cold-brew"
            style={{ backgroundImage: `url(${coldbrew})` }}
          >
            <div className="card-content">
              <h3>COLD BREW</h3>
              <Link to="/login">View More</Link>
            </div>
          </div>
          <div
            className="card cappuccino"
            style={{ backgroundImage: `url(${capuccino})` }}
          >
            <div className="card-content">
              <h3>CAPPUCCINO</h3>
              <Link to="/login">View More</Link>
            </div>
          </div>
          <div
            className="card cheesecake"
            style={{ backgroundImage: `url(${cheesecake})` }}
          >
            <div className="card-content">
              <h3>RED FRUIT CHEESECAKE</h3>
              <Link to="/login">View More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery">
        <img src={ImagesGallery} alt="Gallery" />
      </section>
<Footer />    </>
  );
};

export default Landing;
