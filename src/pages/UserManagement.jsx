import React, { useState, useEffect } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import registerBg from "../assets/images/register-bg.png";
import "./UserManagement.css";

const API = "https://unjust-tamisha-undeferrably.ngrok-free.dev/api/users";

const UserManagement = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [users, setUsers] = useState([]);

  // USAR APP SECRET, NO EL TOKEN DEL LOGIN
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `AppToken ${import.meta.env.VITE_APPSECRET}`,
    "ngrok-skip-browser-warning": "true"
  });

  // Evitar errores de HTML
  const safeJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("❌ Respuesta no válida (HTML recibido):", text);
      throw new Error("El servidor devolvió HTML en lugar de JSON.");
    }
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // ====================
  // GET ALL USERS
  // ====================
  const getAllUsers = async () => {
    try {
      const res = await fetch(`${API}/getAll`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(res);

      setUsers(data.values || []);
    } catch (error) {
      console.error("❌ Error cargando usuarios:", error);
    }
  };

  // ====================
  // SEARCH USER
  // ====================
  const searchUser = async () => {
    if (!userData.email) return alert("Ingresa un email para buscar.");

    try {
      const res = await fetch(`${API}/email/${userData.email}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(res);

      if (!data.values) {
        alert("Usuario no encontrado.");
        return;
      }

      setUserData({
        name: data.values.name || "",
        email: data.values.email || "",
        password: "",
        role: data.values.role || "",
      });

      alert("Usuario encontrado.");
    } catch (error) {
      console.error("Error searching user:", error);
      alert("Error al buscar usuario.");
    }
  };

  // ====================
  // CREATE USER
  // ====================
  const createUser = async () => {
    if (!userData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(userData.email.trim())) {
      alert("Email has an invalid format");
      return;
    }

    if (!userData.password.trim()) {
      alert("Password is required");
      return;
    }

    if (userData.password.trim().length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (!userData.role.trim()) {
      alert("Role is required");
      return;
    }

    const bodyToSend = {
      name: userData.name.trim(),
      email: userData.email.trim(),
      password: userData.password.trim(),
      role: userData.role.trim(),
    };

    try {
      const res = await fetch(`${API}/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(bodyToSend),
      });

      const data = await safeJson(res);

      if (!res.ok) {
        alert(`⚠️ ${data.message || "Error creating user"}`);
        return;
      }

      alert(data.message || "User created successfully");

      clearForm();
      getAllUsers();

    } catch (error) {
      console.error(error);
      alert("Error creating user.");
    }
  };

  // ====================
  // UPDATE USER
  // ====================
  const updateUser = async () => {
    if (!userData.email) {
      alert("Debes ingresar el email del usuario.");
      return;
    }

    const updateBody = {};
    if (userData.name) updateBody.name = userData.name;
    if (userData.email) updateBody.email = userData.email;
    if (userData.password) updateBody.password = userData.password;
    if (userData.role) updateBody.role = userData.role;

    try {
      const res = await fetch(`${API}/update/${userData.email}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateBody),
      });

      const data = await safeJson(res);

      alert(data.message || "Usuario actualizado.");
      getAllUsers();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar usuario.");
    }
  };

  // ====================
  // DELETE USER
  // ====================
  const deleteUser = async () => {
    if (!userData.email) {
      alert("Debes ingresar el email del usuario.");
      return;
    }

    if (!confirm("¿Seguro que deseas eliminarlo?")) return;

    try {
      const email = encodeURIComponent(userData.email);

      const res = await fetch(`${API}/delete/${email}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await safeJson(res);

      alert(data.message || "Usuario eliminado.");
      getAllUsers();
      clearForm();

    } catch (error) {
      console.error(error);
      alert("Error al eliminar usuario.");
    }
  };

  // ====================
  // CLEAR FORM
  // ====================
  const clearForm = () => {
    setUserData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  // ====================
  // CARGAR USUARIOS AL ENTRAR AL PANEL
  // ====================
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Header2 />

      <div className="admin-container" style={{ backgroundImage: `url(${registerBg})` }}>
        <div className="admin-card">

          <div className="admin-card-header">
            <h2 className="admin-title">USER ADMIN PANEL</h2>
          </div>

          <div className="admin-card-body">

            <div className="admin-input">
              <input type="text" placeholder="Name" name="name" value={userData.name} onChange={handleChange} />
            </div>

            <div className="admin-input">
              <input type="email" placeholder="Email" name="email" value={userData.email} onChange={handleChange} />
            </div>

            <div className="admin-input">
              <input type="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange} />
            </div>

            <div className="admin-input">
              <select name="role" value={userData.role} onChange={handleChange} className="select-input">
                <option value="">Select Role</option>
                <option value="administrator">Administrator</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <div className="admin-btns">
              <button className="save-btn" onClick={createUser}>Create</button>
              <button className="save-btn" onClick={updateUser}>Update</button>
              <button className="erase-btn" onClick={deleteUser}>Delete</button>
              <button className="save-btn" onClick={searchUser}>Search</button>
              <button className="erase-btn" onClick={clearForm}>Clear</button>
            </div>

            <h3 className="users-title">All Users</h3>

            <div className="users-table">
              {users.length === 0 && <p>No users found.</p>}

              {users.map((u, index) => (
                <div key={index} className="user-row">
                  <p><strong>{u.name}</strong></p>
                  <p>{u.email}</p>
                  <p>{u.role}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserManagement;
