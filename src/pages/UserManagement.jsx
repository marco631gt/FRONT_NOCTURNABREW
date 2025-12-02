import React, { useState, useEffect } from "react";
import HeaderAdminPanel from "../components/HeaderAdminPanel";
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

  // POPUP STATE
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "", // success | error | confirm
    onConfirm: null,
  });

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `AppToken ${import.meta.env.VITE_APPSECRET}`,
    "ngrok-skip-browser-warning": "true",
  });

  const safeJson = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error("Invalid response (HTML received):", text);
      throw new Error("Server returned HTML instead of JSON.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const showPopup = (message, type = "success", onConfirm = null) => {
    setPopup({ show: true, message, type, onConfirm });
  };

  const getAllUsers = async () => {
    try {
      const res = await fetch(`${API}/getAll`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await safeJson(res);
      setUsers(data.values || []);
    } catch (error) {
      console.error("Error loading users:", error);
      showPopup("Error loading users.", "error");
    }
  };

  const searchUser = async () => {
    if (!userData.email) return showPopup("Enter an email to search.", "error");

    try {
      const res = await fetch(`${API}/email/${userData.email}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await safeJson(res);

      if (!data.values) {
        showPopup("User not found.", "error");
        return;
      }

      setUserData({
        name: data.values.name || "",
        email: data.values.email || "",
        password: "",
        role: data.values.role || "",
      });

      showPopup("User found.", "success");
    } catch (error) {
      console.error("Error searching user:", error);
      showPopup("Error searching user.", "error");
    }
  };

  const createUser = async () => {
    if (!userData.name.trim()) return showPopup("Name is required", "error");

    const onlyLettersPattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
  if (!onlyLettersPattern.test(userData.name)) {
    return showPopup("Name must contain only letters.", "error");
  }

    const sqlPattern =
      /['";=]|(--|\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|WHERE|OR|AND)\b)/i;

    if (sqlPattern.test(userData.name)) {
      return showPopup("Invalid characters detected in name.", "error");
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(userData.email.trim())
    )
      return showPopup("Email has an invalid format", "error");

    if (!userData.password.trim())
      return showPopup("Password is required", "error");

    if (userData.password.trim().length < 6)
      return showPopup(
        "Password must be at least 6 characters long",
        "error"
      );

    if (!userData.role.trim()) return showPopup("Role is required", "error");

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
      if (!res.ok)
        return showPopup(data.message || "Error creating user", "error");

      showPopup(data.message || "User created successfully.", "success");
      clearForm();
      getAllUsers();
    } catch (error) {
      console.error(error);
      showPopup("Error creating user.", "error");
    }
  };

  const updateUser = async () => {
    if (!userData.email)
      return showPopup("You must enter the user email.", "error");

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
      showPopup(data.message || "User updated.", "success");

      getAllUsers();
    } catch (error) {
      console.error(error);
      showPopup("Error updating user.", "error");
    }
  };

  const deleteUser = async () => {
    if (!userData.email)
      return showPopup("You must enter the user email.", "error");

    showPopup(
      `Are you sure you want to delete user ${userData.name}?`,
      "confirm",
      async () => {
        try {
          const email = encodeURIComponent(userData.email);
          const res = await fetch(`${API}/delete/${email}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
          });

          const data = await safeJson(res);
          showPopup(data.message || "User deleted.", "success");

          getAllUsers();
          clearForm();
        } catch (error) {
          console.error(error);
          showPopup("Error deleting user.", "error");
        }
      }
    );
  };

  const clearForm = () => {
    setUserData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <HeaderAdminPanel />

      {/* POPUP */}
      {popup.show && (
        <div className={`popup-overlay ${popup.type}`}>
          <div className="popup-box">
            <p>{popup.message}</p>

            {popup.type === "confirm" ? (
              <div className="popup-buttons">
                <button
                  onClick={() => {
                    if (popup.onConfirm) popup.onConfirm();
                    setPopup({
                      show: false,
                      message: "",
                      type: "",
                      onConfirm: null,
                    });
                  }}
                >
                  Yes
                </button>

                <button
                  onClick={() =>
                    setPopup({
                      show: false,
                      message: "",
                      type: "",
                      onConfirm: null,
                    })
                  }
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  setPopup({
                    show: false,
                    message: "",
                    type: "",
                    onConfirm: null,
                  })
                }
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}

      <div
        className="admin-container"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-title">USER ADMIN PANEL</h2>
          </div>

          <div className="admin-card-body">
            <div className="admin-body-container">
              {/* USERS LIST */}
              <div className="users-section">
                <h3 className="users-title">All Users</h3>

                <div className="users-header-row">
                  <p>Name</p>
                  <p>Email</p>
                  <p>Role</p>
                </div>

                <div className="users-table">
                  {users.length === 0 && <p>No users found.</p>}

                  {users.map((u, index) => (
                    <div key={index} className="user-row">
                      <p>
                        <strong>{u.name}</strong>
                      </p>
                      <p>{u.email}</p>
                      <p>{u.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FORM */}
              <div className="form-section">
                <div className="admin-input">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-input">
                  <select
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    className="select-input"
                  >
                    <option value="">Select Role</option>
                    <option value="administrator">Administrator</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>

                <div className="admin-btns">
                  <button className="save-btn" onClick={createUser}>
                    Create
                  </button>
                  <button className="save-btn" onClick={updateUser}>
                    Update
                  </button>
                  <button className="erase-btn" onClick={deleteUser}>
                    Delete
                  </button>
                  <button className="save-btn" onClick={searchUser}>
                    Search
                  </button>
                  <button className="erase-btn" onClick={clearForm}>
                    Clear
                  </button>
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

export default UserManagement;
