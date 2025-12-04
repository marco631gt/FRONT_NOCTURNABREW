import React, { useState, useEffect } from "react";
import HeaderManagement from "../components/HeaderManagement";
import Footer from "../components/Footer";
import registerBg from "../assets/images/register-bg.png";
import "./Createproduct.css";

const Createproduct = () => {

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: ""
  });

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


  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/getAll",
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
        console.error("Invalid JSON");
        return;
      }

      const list = data.values || [];

      if (list.length > 0) {
        const maxId = Math.max(...list.map((p) => p.id));
        setProduct((prev) => ({ ...prev, id: maxId + 1 }));
      } else {
        setProduct((prev) => ({ ...prev, id: 1 }));
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          console.error("Invalid JSON");
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
    const selected = allIngredients.find(
      (i) => i.ingredientId === Number(selectedId)
    );
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
    if (product.ingredients.length >= 5)
      return setPopup({
        show: true,
        message: "Maximum 5 ingredients.",
        type: "error"
      });

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
        `https://unjust-tamisha-undeferrably.ngrok-free.dev/api/products/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `AppToken ${import.meta.env.VITE_APPSECRET}`,
            "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            id: Number(product.id),
            name: product.name,
            price: Number(product.price),
            category: product.category,
            description: product.description,
            url: product.url,
            available: product.available,
            ingredients: product.ingredients.map((ing) => ({
              ingredientId: Number(ing.ingredientId),
              ingredientName: ing.ingredientName,
              quantity: Number(ing.quantity),
              unit: ing.unit,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setPopup({
          show: true,
          message: "Error creating product.",
          type: "error"
        });
        return;
      }

      setPopup({
        show: true,
        message: "Product created successfully!",
        type: "success"
      });

      eraseProduct();
      await fetchProducts();

    } catch (err) {
      console.error("Error saving product:", err);
      setPopup({
        show: true,
        message: "Error saving product.",
        type: "error"
      });
    }
  };

  const eraseProduct = () => {
    setProduct((prev) => ({
      ...prev,
      name: "",
      price: "",
      category: "",
      description: "",
      url: "",
      available: true,
      ingredients: [{ ingredientId: "", ingredientName: "", quantity: "", unit: "" }],
    }));
  };

  return (
    <>
      {popup.show && (
        <div className={`popup-overlay ${popup.type}`}>
          <div className="popup-box">
            <p>{popup.message}</p>
            <button onClick={() => setPopup({ ...popup, show: false })}>
              OK
            </button>
          </div>
        </div>
      )}

      <HeaderManagement />

      <div
        className="create-container"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="create-card">
          <div className="create-card-header">
            <h2 className="create-title">CREATE PRODUCT</h2>
          </div>

          <div className="create-card-body">
            <div className="create-input">
              <input
                type="number"
                placeholder="Id Product"
                name="id"
                value={product.id}
                readOnly
              />
            </div>

            <div className="create-input">
              <input type="text" placeholder="Product name" name="name" value={product.name} onChange={handleChange} />
            </div>

            <div className="create-input">
              <textarea placeholder="Description" name="description" value={product.description} onChange={handleChange}></textarea>
            </div>

            <div className="create-input">
              <input type="number" placeholder="Price: $" name="price" value={product.price} onChange={handleChange} />
            </div>

            <div className="create-input">
              <select name="category" value={product.category} onChange={handleChange} className="select-input">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="create-input">
              <input type="text" placeholder="Image URL" name="url" value={product.url} onChange={handleChange} />
            </div>

            {product.url && (
              <div className="create-img-wrapper">
                <img src={product.url} alt="preview" className="create-img-preview" />
              </div>
            )}

            <h3 className="ingredients-title">Ingredients (max 5)</h3>

            {product.ingredients.map((ing, index) => (
              <div key={index} className="ingredient-rowcreate">

                <input type="number" value={ing.ingredientId} readOnly />

                <select value={ing.ingredientId} onChange={(e) => handleIngredientSelect(index, e.target.value)}>
                  <option value="">{ing.ingredientName || "Select Ingredient"}</option>
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
              <button className="save-btn" onClick={saveProduct}>Save Product</button>
              <button className="erase-btn" onClick={eraseProduct}>Erase Product</button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Createproduct;
