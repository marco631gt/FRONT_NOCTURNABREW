import React from "react";

const ProductCard = ({ img, name, desc, price }) => {
  return (
    <div className="product-card">
      <img src={img} alt={name} />
      <h4>{name}</h4>
      <p>{desc}</p>
      <p className="price">${price}</p>
    </div>
  );
};

export default ProductCard;
