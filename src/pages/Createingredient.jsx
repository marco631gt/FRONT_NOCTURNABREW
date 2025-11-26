import React, { useState, useEffect } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import registerBg from "../assets/images/register-bg.png";
import "./Createingredient.css";

const API = "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/stock";

const Createingredient = () => {
  const [ingredientData, setIngredientData] = useState({
    id: "",
    name: "",
    unit: "",
    quantity: "",
  });

  const [ingredients, setIngredients] = useState([]);

  // HEADERS
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `AppToken ${import.meta.env.VITE_APPSECRET}`,
    "Auth-User": `Bearer ${localStorage.getItem("userToken")}`,
    "ngrok-skip-browser-warning": "true",
  });

  const safeJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("❌ Respuesta no válida:", text);
      throw new Error("Error parsing JSON");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredientData({ ...ingredientData, [name]: value });
  };

  // ➤ GENERA EL SIGUIENTE ID AUTOMÁTICO
  const generateNextId = (list) => {
    if (!list || list.length === 0) return 1;
    const maxId = Math.max(...list.map((i) => Number(i.id)));
    return maxId + 1;
  };

  const getAllIngredients = async () => {
    try {
      const res = await fetch(`${API}/getAll`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(res);
      const list = data.values || [];

      setIngredients(list);

    } catch (error) {
      console.error("❌ Error cargando ingredientes:", error);
    }
  };

  const searchIngredient = async () => {
    if (!ingredientData.id) return alert("Ingresa un ID para buscar.");

    try {
      const res = await fetch(`${API}/id/${ingredientData.id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(res);

      if (!data.values) return alert("Ingrediente no encontrado.");

      setIngredientData({
        id: data.values.id,
        name: data.values.name,
        unit: data.values.unit,
        quantity: data.values.quantity,
      });

      alert("Ingrediente encontrado.");
    } catch (error) {
      console.error(error);
      alert("Error al buscar ingrediente.");
    }
  };

  // ➤ CREATE — SOLO AQUÍ SE GENERA EL ID AUTOMÁTICO
  const createIngredient = async () => {
    const newId = generateNextId(ingredients);

    if (!ingredientData.name.trim()) return alert("El nombre es requerido.");
    if (!ingredientData.unit.trim()) return alert("La unidad es requerida.");

    const bodyToSend = {
      id: newId,
      name: ingredientData.name.trim(),
      unit: ingredientData.unit.trim(),
      quantity: Number(ingredientData.quantity) || 0,
    };

    try {
      const res = await fetch(`${API}/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(bodyToSend),
      });

      const data = await safeJson(res);

      if (!res.ok) return alert(data.message || "Error al crear ingrediente");

      alert("Ingrediente creado.");

      // Recargar tabla
      await getAllIngredients();

      // 🔥 LIMPIAR FORM COMPLETO (incluye ID)
      setIngredientData({
        id: "",
        name: "",
        unit: "",
        quantity: "",
      });

      // 🔥 Después de un breve delay, poner el ID siguiente
      setTimeout(() => {
        setIngredientData((prev) => ({
          ...prev,
          id: generateNextId([...ingredients, bodyToSend]),
        }));
      }, 300);

    } catch (error) {
      console.error(error);
      alert("Error al crear ingrediente.");
    }
  };

  const updateIngredient = async () => {
    if (!ingredientData.id) return alert("Debes ingresar un ID.");

    const updateBody = {};
    if (ingredientData.name) updateBody.name = ingredientData.name;
    if (ingredientData.unit) updateBody.unit = ingredientData.unit;
    if (ingredientData.quantity !== "")
      updateBody.quantity = Number(ingredientData.quantity);

    try {
      const res = await fetch(`${API}/update/${ingredientData.id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateBody),
      });

      const data = await safeJson(res);
      alert(data.message || "Ingrediente actualizado.");
      getAllIngredients();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar.");
    }
  };

  const deleteIngredient = async () => {
    if (!ingredientData.id) return alert("Debes ingresar un ID.");
    if (!confirm("¿Eliminar ingrediente?")) return;

    try {
      const res = await fetch(`${API}/delete/${ingredientData.id}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(res);
      alert(data.message || "Ingrediente eliminado.");
      getAllIngredients();

      // Limpiar formulario y generar nuevo ID
      setIngredientData({
        id: "",
        name: "",
        unit: "",
        quantity: "",
      });

      setTimeout(() => {
        setIngredientData((prev) => ({
          ...prev,
          id: generateNextId(
            ingredients.filter((x) => x.id !== Number(ingredientData.id))
          ),
        }));
      }, 300);

    } catch (error) {
      console.error(error);
      alert("Error al eliminar.");
    }
  };

  const clearForm = () => {
    setIngredientData({
      id: "",
      name: "",
      unit: "",
      quantity: "",
    });

    setTimeout(() => {
      setIngredientData((prev) => ({
        ...prev,
        id: generateNextId(ingredients),
      }));
    }, 300);
  };

  useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <>
      <Header2 />

      <div
        className="ingredient-container"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="ingredient-card">
          <div className="ingredient-card-header">
            <h2 className="ingredient-title">INGREDIENT ADMIN PANEL</h2>
          </div>

          <div className="ingredient-card-body">
            <div className="ingredient-body-container">

              {/* LISTA */}
              <div className="ingredients-section">
                <h3 className="ingredients-title">All Ingredients</h3>

                <div className="ingredients-header-row">
                  <p>ID</p>
                  <p>Name</p>
                  <p>Unit</p>
                  <p>Qty</p>
                </div>

                <div className="ingredients-table">
                  {ingredients.length === 0 && <p>No ingredients found.</p>}

                  {ingredients.map((i, index) => (
                    <div key={index} className="ingredient-row">
                      <p><strong>{i.id}</strong></p>
                      <p>{i.name}</p>
                      <p>{i.unit}</p>
                      <p>{i.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORM */}
              <div className="ingredient-form-section">

                <div className="ingredient-input">
                  <input
                    type="number"
                    placeholder="ID"
                    name="id"
                    value={ingredientData.id}
                    onChange={handleChange}   // ← ID editable
                  />
                </div>

                <div className="ingredient-input">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={ingredientData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="ingredient-input">
                  <select
                    name="unit"
                    value={ingredientData.unit}
                    onChange={handleChange}
                  >
                    <option value="">Select unit</option>
                    <option value="g">Grams (g)</option>
                    <option value="ml">Milliliters (ml)</option>
                    <option value="piece">Piece</option>
                  </select>
                </div>

                <div className="ingredient-input">
                  <input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={ingredientData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="ingredient-btns">
                  <button className="save-btn" onClick={createIngredient}>Create</button>
                  <button className="save-btn" onClick={updateIngredient}>Update</button>
                  <button className="erase-btn" onClick={deleteIngredient}>Delete</button>
                  <button className="save-btn" onClick={searchIngredient}>Search</button>
                  <button className="erase-btn" onClick={clearForm}>Clear</button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Createingredient;
