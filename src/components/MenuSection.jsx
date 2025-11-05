import React from "react";
import ProductCard from "./ProductCard";

const ProductsGrid = ({ products }) => {
  return (
    <div className="product-container active">
      {products.map((p, i) => (
        <ProductCard
          key={i}
          img={p.image}
          name={p.name}
          desc={p.description}
          price={p.price}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
