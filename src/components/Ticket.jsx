import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Ticket.css";

const Ticket = ({ order }) => {
  if (!order) return null;

  const items = order?.items || [];

  const qrText =
    `NOCTURNA BREW\n` +
    `Order #${order.orderId}\n` +
    `Date: ${new Date(order.date).toLocaleString()}\n\n` +
    `Products:\n` +
    items.map(item => `- ${item.qty}x ${item.name} = $${item.qty * item.price}`).join("\n") +
    `\n\nTotal: $${order.total}\n` +
    `Thank you! ❤️`;

  return (
    <div className="ticket-container">
      <div className="ticket">
        <h2 className="title">NOCTURNA BREW</h2>

        <p className="date">{new Date(order.date).toLocaleString()}</p>
        <div className="divider" />

        <h3>Productos</h3>
        {items.length === 0 ? (
          <p>No hay productos en esta orden</p>
        ) : (
          items.map((item, i) => (
            <div key={i} className="item-row">
              <span>{item.qty}× {item.name}</span>
              <span>${item.price * item.qty}</span>
            </div>
          ))
        )}

        <div className="divider" />

        <div className="total-row">
          <strong>Total:</strong>
          <strong>${order.total}</strong>
        </div>

        <div className="divider" />

        <div className="qr-section">
          <QRCodeCanvas 
            size={160}
            value={qrText}
          />
        </div>

        <p className="order-number">ORDEN #{order.orderId}</p>

        <div className="divider" />
        <p className="thankyou">Gracias por tu pedido ❤️</p>
      </div>
    </div>
  );
};

export default Ticket;
