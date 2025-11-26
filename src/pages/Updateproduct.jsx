import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import registerBg from "../assets/images/register-bg.png";
import "./Updateproduct.css";

const Updateproduct = () => {
  const location = useLocation();

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

  const [allIngredients, setAllIngredients] = useState([]);

  const categories = [
    "Iced Favorites",
    "Hot Favorites",
    "Sweet Delicacies",
    "Savory Delicacies",
    "Cold Brew",
  ];

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(
          "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/stock/getAll",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `AppToken ${import.meta.env.VITE_APPSECRET}`,
              "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("❌ No es JSON válido");
          return;
        }

        const list = data.values || [];

        const mapped = list.map((i) => ({
          ingredientId: i.id,
          ingredientName: i.name,
          unit: i.unit,
        }));

        setAllIngredients(mapped);
      } catch (err) {
        console.error("Error fetching ingredients:", err);
        setAllIngredients([]);
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleIngredientSelect = (index, selectedId) => {
    const selected = allIngredients.find((i) => i.ingredientId === Number(selectedId));
    if (!selected) return;

    const updated = [...product.ingredients];
    updated[index] = {
      ...updated[index],
      ingredientId: selected.ingredientId,
      ingredientName: selected.ingredientName,
      unit: selected.unit,
    };

    setProduct({ ...product, ingredients: updated });
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...product.ingredients];
    updated[index][field] = value;
    setProduct({ ...product, ingredients: updated });
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

  const saveProduct = async () => {
    try {
      const response = await fetch(
        `https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/update/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `AppToken ${import.meta.env.VITE_APPSECRET}`,
            "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            name: product.name,
            price: Number(product.price),
            category: product.category,
            description: product.description,
            url: product.url,
            available: product.available,
            ingredients: product.ingredients.map((ing) => ({
              ingredientId: ing.ingredientId,
              ingredientName: ing.ingredientName,
              quantity: Number(ing.quantity),
              unit: ing.unit,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error updating product:", data);
        alert("❌ Error updating product. Check console.");
        return;
      }

      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error("Error saving product:", err);
      alert("❌ Error saving product. Check console.");
    }
  };

  const toggleAvailability = async () => {
    try {
      const newStatus = !product.available;

      const response = await fetch(
        `https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/update/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `AppToken ${import.meta.env.VITE_APPSECRET}`,
            "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            available: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error updating availability:", data);
        alert("❌ Error updating product status.");
        return;
      }

      setProduct({ ...product, available: newStatus });

      alert(
        newStatus
          ? "✅ Producto marcado como DISPONIBLE"
          : "👁️ Producto OCULTO"
      );
    } catch (err) {
      console.error("Error updating availability:", err);
      alert("❌ Error updating availability.");
    }
  };

  return (
    <>
      <Header2 />
      <div
        className="update-container"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="update-card">
          <div className="update-card-header">
            <h2 className="update-title">UPDATE PANEL</h2>
          </div>

          <div className="update-card-body">
            <div className="update-input">
              <input
                type="number"
                placeholder="Id Product"
                name="id"
                value={product.id}
                readOnly
              />
            </div>

            <div className="update-input">
              <input
                type="text"
                placeholder="Product name"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
            </div>

            <div className="update-input">
              <textarea
                placeholder="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <div className="update-input">
              <input
                type="number"
                placeholder="Price: $"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>

            <div className="update-input">
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="select-input"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="update-input">
              <input
                type="text"
                placeholder="Image URL"
                name="url"
                value={product.url}
                onChange={handleChange}
              />
            </div>

            {product.url && (
              <div className="update-img-wrapper">
                <img
                  src={product.url}
                  alt="preview"
                  className="update-img-preview"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            <h3 className="ingredients-title">Ingredients (max 5)</h3>

            {product.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-row">
                <input type="number" value={ing.ingredientId} readOnly />

                <select
                  value={ing.ingredientId}
                  onChange={(e) =>
                    handleIngredientSelect(index, e.target.value)
                  }
                >
                  <option value="">
                    {ing.ingredientName || "Select Ingredient"}
                  </option>
                  {allIngredients.map((i) => (
                    <option key={i.ingredientId} value={i.ingredientId}>
                      {i.ingredientName}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Qty"
                  value={ing.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                />

                <input type="text" placeholder="Unit" value={ing.unit} readOnly />

                {index > 0 && (
                  <button
                    className="remove-ing"
                    onClick={() => removeIngredient(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            <button className="add-ing-btn" onClick={addIngredient}>
              + Add Ingredient
            </button>

            <div className="update-btns">
              <button className="save-btn" onClick={saveProduct}>
                Save Product
              </button>

              <button className="erase-btn" onClick={toggleAvailability}>
                {product.available
                  ? "Ocultar Producto"
                  : "Marcar como Disponible"}
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
