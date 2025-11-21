import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./cart.css";
import gallery from "../assets/images/ImagesGallery.png";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { useCart } from "../context/Cartcontext";

const Cart = () => {
    const location = useLocation();
    const { cart, updateQty, deleteItem } = useCart();



    // 🔥 CALCULAR SUBTOTAL Y TOTAL
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const [showPopup, setShowPopup] = React.useState(false);

    const handleFinishOrder = (e) => {
        if (cart.length === 0) {
            e.preventDefault();
            setShowPopup(true); // mostrar popup
        }
    };




    return (
        <>
            <Header2 />

            <section className="categoriesrefresh1">

                {/* 🔥 TITULO Y MENSAJE VACÍO */}
                <section className="titlecart">
                    <h2>YOUR CART IS:</h2>

                    {cart.length === 0 && (
                        <p className="no-products">Your cart is empty</p>
                    )}
                </section>

                {/* 🔥 LISTA DE PRODUCTOS */}
                {cart.length > 0 && (
                    <div className="product-container active">
                        {cart.map((p, i) => (
                            <div className="product-card" key={i}>
                                {p.url && (
                                    <img
                                        src={p.url}
                                        alt={p.name}
                                        onError={(e) => (e.target.style.display = "none")}
                                    />
                                )}

                                <h4>{p.name}</h4>
                                <p>{p.description}</p>
                                <p className="price">${p.price}</p>

                                
                                <div className="qty-container">
                                    <button className="qty-btn" onClick={() => updateQty(p.id, -1)}>
                                        –
                                    </button>

                                    <span className="qty-number">{p.qty}</span>

                                    <button className="qty-btn" onClick={() => updateQty(p.id, 1)}>
                                        +
                                    </button>
                                </div>

                                
                                <button
                                    className="btn-add"
                                    style={{ backgroundColor: "#8b1a1a" }}
                                    onClick={() => deleteItem(p.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            
            {true && (
                <section className="cart-summary-section">
                    <div className="cart-summary">
                        <p><strong>Subtotal:</strong> ${subtotal}</p>
                        <p><strong>Total + IVA:</strong> ${total}</p>
                    </div>
                    <Link to="/QR" onClick={handleFinishOrder}>
                        <button className="finish-order-btn">
                            Finish Order</button>
                    </Link>
                </section>
            )}

            {showPopup && (
                <div className="popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <h3>Cart Empty</h3>
                        <p>You cannot complete your order because your cart is empty.</p>
                        <button className="popup-btn" onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}


            <section className="gallery">
                <img src={gallery} alt="Gallery" />
            </section>

            <Footer />
        </>
    );
};

export default Cart;
