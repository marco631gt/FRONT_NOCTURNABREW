import React from "react";
import HeaderAdminPanel from "../components/HeaderAdminPanel";
import Footer from "../components/Footer";
import registerBg from "../assets/images/register-bg.png";
import Productmanagement from "../assets/images/Productmanagement.png";
import Usermanagement from "../assets/images/Usermanagement.png";
import { Link } from "react-router-dom";
import "./adminpanel.css";

const AdminPanel = () => {
  return (
    <div className="adminpanel-container">
      <HeaderAdminPanel />

      <div
        className="adminpanel-bg"
        style={{ backgroundImage: `url(${registerBg})` }}
      >
        <div className="adminpanel-box">
          <h2 className="adminpanel-title">Admin Panel</h2>

          <div className="adminpanel-buttons">
            <Link to="/Productmanagement">
            <button className="adminpanel-btn product">
              <img src={Productmanagement} alt="product icon" className="adminpanel-img" />
              Product Management
            </button>
            </Link>
            <Link to="/UserManagement">
            <button className="adminpanel-btn user">
              <img src={Usermanagement} alt="user icon" className="adminpanel-img" />
              User Management
            </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanel;
