import React, { useState } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import registerBg from "../assets/images/register-bg.png";
import "./Updateproduct.css";

const Updateproduct = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    url: "",
    available: true,
    ingredients: [{ ingredientId: 1, ingredientName: "", quantity: "", unit: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...product.ingredients];
    updated[index][field] = value;
    setProduct({ ...product, ingredients: updated });
  };

  const addIngredient = () => {
    if (product.ingredients.length >= 5)
      return alert("Máximo 5 ingredientes.");

    setProduct({
      ...product,
      ingredients: [
        ...product.ingredients,
        {
          ingredientId: product.ingredients.length + 1,
          ingredientName: "",
          quantity: "",
          unit: "",
        },
      ],
    });
  };

  const removeIngredient = (index) => {
    const updated = product.ingredients.filter((_, i) => i !== index);

    const reordered = updated.map((ing, i) => ({
      ...ing,
      ingredientId: i + 1,
    }));

    setProduct({ ...product, ingredients: reordered });
  };

  const saveProduct = () => {
    console.log("PRODUCT SENT:", product);
    alert("Product saved (demo).");
  };

  const eraseProduct = () => {
    setProduct({
      id: "",
      name: "",
      price: "",
      category: "",
      description: "",
      url: "",
      available: true,
      ingredients: [{ ingredientId: 1, ingredientName: "", quantity: "", unit: "" }],
    });
    alert("Product cleared.");
  };

  return (
    <>
      <Header2 />

      <div
        className="create-container"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="create-card">

          {/* 🔥 TÍTULO FIJO */}
          <div className="create-card-header">
            <h2 className="create-title">CREATE PRODUCT</h2>
          </div>

          {/* 🔥 FORMULARIO CON SCROLL */}
          <div className="create-card-body">

            {/* ID */}
            <div className="create-input">
              <input
                type="number"
                placeholder="Id Product"
                name="id"
                value={product.id}
                onChange={handleChange}
              />
            </div>

            {/* Name */}
            <div className="create-input">
              <input
                type="text"
                placeholder="Product name"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>

            {/* description */}
            <div className="create-input">
              <textarea
                placeholder="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Price */}
            <div className="create-input">
              <input
                type="number"
                placeholder="Price: $"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div className="create-input">
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="select-input"
              >
                <option value="">Select Category</option>
                <option value="IcedFavorites">Iced Favorites</option>
                <option value="HotFavorites">Hot Favorites</option>
                <option value="SweetDelicacies">Sweet Delicacies</option>
                <option value="SavoryDelicacies">Savory Delicacies</option>
              </select>
            </div>

            {/* URL */}
            <div className="create-input">
              <input
                type="text"
                placeholder="Image URL"
                name="url"
                value={product.url}
                onChange={handleChange}
              />
            </div>

            {product.url && (
              <img
                src={product.url}
                alt="preview"
                className="create-img-preview"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}

            {/* INGREDIENTS */}
            <h3 className="ingredients-title">Ingredients (max 5)</h3>

            {product.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-row">
                <input type="number" value={ing.ingredientId} readOnly />

                <input
                  type="text"
                  placeholder="Name"
                  value={ing.ingredientName}
                  onChange={(e) =>
                    handleIngredientChange(index, "ingredientName", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Qty"
                  value={ing.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Unit"
                  value={ing.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                />

                {index > 0 && (
                  <button className="remove-ing" onClick={() => removeIngredient(index)}>
                    X
                  </button>
                )}
              </div>
            ))}

            <button className="add-ing-btn" onClick={addIngredient}>
              + Add Ingredient
            </button>

            <div className="create-btns">
              <button className="save-btn" onClick={saveProduct}>
                Save Product
              </button>
              <button className="erase-btn" onClick={eraseProduct}>
                Erase Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Updateproduct;
