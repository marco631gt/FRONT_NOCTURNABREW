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
    ingredients: [{ ingredientId: "", ingredientName: "", quantity: "", unit: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...product.ingredients];
    updatedIngredients[index][field] = value;
    setProduct({ ...product, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    if (product.ingredients.length >= 5) return alert("Máximo 5 ingredientes.");
    setProduct({
      ...product,
      ingredients: [
        ...product.ingredients,
        { ingredientId: "", ingredientName: "", quantity: "", unit: "" },
      ],
    });
  };

  const removeIngredient = (index) => {
    const updated = product.ingredients.filter((_, i) => i !== index);
    setProduct({ ...product, ingredients: updated });
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
      ingredients: [{ ingredientId: "", ingredientName: "", quantity: "", unit: "" }],
    });
  };

  return (
    <>
      <Header2 />

      <div
        className="admin-container"
        style={{
          backgroundImage: `url(${registerBg})`,
        }}
      >
        <div className="admin-card">
          <h2 className="admin-title">PRODUCT MANAGEMENT</h2>

          <div className="admin-input">
            <input
              type="number"
              placeholder="Id Product"
              name="id"
              value={product.id}
              onChange={handleChange}
            />
          </div>

          <div className="admin-input">
            <input
              type="text"
              placeholder="Product name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>

          <div className="admin-input">
            <textarea
              placeholder="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="admin-input">
            <input
              type="number"
              placeholder="Price: $"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div className="admin-input">
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>

          <div className="admin-input">
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
              className="admin-img-preview"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}

          <h3 className="ingredients-title">Ingredients (max 5)</h3>

          {product.ingredients.map((ing, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="number"
                placeholder="ID"
                value={ing.ingredientId}
                onChange={(e) =>
                  handleIngredientChange(index, "ingredientId", e.target.value)
                }
              />

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

          <div className="admin-btns">
            <button className="save-btn" onClick={saveProduct}>
              Save Product
            </button>

            <button className="erase-btn" onClick={eraseProduct}>
              Erase Product
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Updateproduct;
