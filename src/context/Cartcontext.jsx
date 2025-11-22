import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (product.qty === 0) return;

    setCart((prevCart) => {
      const exists = prevCart.find((p) => p.id === product.id);

      // 🔥 SUMAR cantidades si ya existe
      if (exists) {
        return prevCart.map((p) =>
          p.id === product.id
            ? { ...p, qty: p.qty + product.qty }
            : p
        );
      }

      // Agregar nuevo producto
      return [...prevCart, product];
    });
  };

  const updateQty = (id, increment) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, Math.min(10, item.qty + increment)) }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ NUEVO: Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, deleteItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
