import React, { useState } from "react";
import "./menu.css";
import gallery from "../assets/images/ImagesGallery.png";

import icedFavorites from "../assets/images/icedfavorites.png";
import hotFavorites from "../assets/images/hotfavorites.png";
import sweetDelicacies from "../assets/images/sweetdelicacies.png";
import savoryDelicacies from "../assets/images/savorydelicacies.png";

import icecoffefrappe from "../assets/images/imagesiced/icecoffefrappe.png";
import coldbrew from "../assets/images/imagesiced/coldbrew.png";
import icelemontea from "../assets/images/imagesiced/icelemontea.png";
import strawberrysmothie from "../assets/images/imagesiced/strawberrysmothie.png";

import espresso from "../assets/images/imageshot/espresso.png";
import americano from "../assets/images/imageshot/americano.png";
import cappuchino from "../assets/images/imageshot/cappuchino.png";
import latte from "../assets/images/imageshot/latte.png";
import moccha from "../assets/images/imageshot/moccha.png";
import pumpkinspice from "../assets/images/imageshot/pumpkinspice.png";
import matcha from "../assets/images/imageshot/matcha.png";

import chocolatebrownie from "../assets/images/imagessweet/chocolatebrownie.png";
import lemonpie from "../assets/images/imagessweet/lemonpie.png";
import redberrychessecake from "../assets/images/imagessweet/redberrychessecake.png";
import homemadecookies from "../assets/images/imagessweet/homemadecookies.png";

import hamcheesepanini from "../assets/images/imagessavory/hamcheesepanini.png";
import buttercroissant from "../assets/images/imagessavory/buttercroissant.png";
import bagelcreamcheese from "../assets/images/imagessavory/bagelcreamcheese.png";
import avocadotoast from "../assets/images/imagessavory/avocadotoast.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";


const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("iced");

  const categories = [
    { id: "iced", title: "ICED FAVORITES", image: icedFavorites },
    { id: "hot", title: "HOT FAVORITES", image: hotFavorites },
    { id: "sweet", title: "SWEET DELICACIES", image: sweetDelicacies },
    { id: "savory", title: "SAVORY DELICACIES", image: savoryDelicacies },
  ];

  const products = {
    iced: [
      { img: icecoffefrappe, name: "ICED COFFEE FRAPPÉ", desc: "Chilled coffee blended with ice and cream.", price: 55 },
      { img: coldbrew, name: "COLD BREW", desc: "Slow-steeped, naturally sweet, and soothingly smooth.", price: 52 },
      { img: icelemontea, name: "ICED LEMON TEA", desc: "Crisp, light, and full of quiet energy.", price: 40 },
      { img: strawberrysmothie, name: "STRAWBERRY SMOOTHIE", desc: "Fresh fruit, creamy yogurt, and a touch of starlight.", price: 50 },
    ],
    hot: [
      { img: espresso, name: "ESPRESSO", desc: "Rich, intense flavor with a timeless aroma.", price: 35 },
      { img: americano, name: "AMERICANO", desc: "Strong and balanced, like the calm of midnight.", price: 38 },
      { img: cappuchino, name: "CAPPUCCHINO", desc: "Espresso kissed with creamy foam and a hint of cinnamon.", price: 45 },
      { img: latte, name: "LATTE", desc: "Smooth espresso blended with velvety milk.", price: 48 },
      { img: moccha, name: "MOCCHA", desc: "Coffee, chocolate, and a swirl of whipped moonlight.", price: 50 },
      { img: pumpkinspice, name: "PUMPKIN SPICE", desc: "Espresso, warm spices, and sweet autumn comfort.", price: 55 },
      { img: matcha, name: "MATCHA", desc: "Smooth green tea with creamy moonlit calm.", price: 52 },
    ],
    sweet: [
      { img: chocolatebrownie, name: "CHOCOLATE BROWNIE", desc: "Soft, rich, and dotted with chocolate chips.", price: 35 },
      { img: lemonpie, name: "LEMON PIE", desc: "Light and sweet, the perfect coffee companion.", price: 40 },
      { img: redberrychessecake, name: "RED BERRY CHEESECAKE", desc: "Creamy bliss topped with natural jam.", price: 45 },
      { img: homemadecookies, name: "HOMEMADE COOKIES (2 PCS)", desc: "Oatmeal or chocolate chip, baked with love.", price: 25 },
    ],
    savory: [
      { img: hamcheesepanini, name: "HAM & CHEESE PANINI", desc: "Toasted, warm, and satisfyingly crisp.", price: 60 },
      { img: buttercroissant, name: "BUTTER CROISSANT", desc: "Freshly baked, golden, and flaky.", price: 30 },
      { img: bagelcreamcheese, name: "BAGEL WITH CREAM CHEESE", desc: "Light, smooth, and simply delicious.", price: 40 },
      { img: avocadotoast, name: "AVOCADO TOAST", desc: "Toasted bread with creamy avocado.", price: 55 },
    ],
  };

  return (
    <>
<Header2/>
      <section className="categoriesrefresh">
        <h2>OUR TEMPTATIONS</h2>

        <div className="cards">
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`card ${activeCategory === cat.id ? "selected" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <img src={cat.image} alt={cat.title} />
              <div className="overlay">
                <h3>{cat.title}</h3>
                <p>View more</p>
              </div>
            </div>
          ))}
        </div>

        <h3><span className="color2">Refresh your night...</span></h3>

        <div className="product-container active">
          {products[activeCategory].map((p, i) => (
            <div className="product-card" key={i}>
              <img src={p.img} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
              <p className="price">${p.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery">
        <img src={gallery} alt="Gallery" />
      </section>

<Footer/>
    </>
  );
};

export default Menu;
