import React from "react";

const CategoryCard = ({ id, title, image, activeCategory, onClick }) => {
  return (
    <div
      className={`card ${activeCategory === id ? "selected" : ""}`}
      onClick={() => onClick(id)}
    >
      <img src={image} alt={title} />
      <div className="overlay">
        <h3>{title}</h3>
        <p>View more</p>
      </div>
    </div>
  );
};

export default CategoryCard;
