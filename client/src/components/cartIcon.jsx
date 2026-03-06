import React from "react";
import cartlogo from "../images/cartlogo.png";

const CartIcon = ({ length }) => {
  return (
    <div style={containerStyle}>
      <div style={textWrapperStyle}>
        <span style={labelStyle}>Cart</span>
        <span style={countStyle}>({length ?? 0})</span>
      </div>
      <img src={cartlogo} alt="Cart" style={iconStyle} />
    </div>
  );
};

// --- STYLES ---
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "5px 10px",
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Light subtle background
  borderRadius: "8px",
};

const textWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end", // Aligns text to the right, next to the icon
  lineHeight: "1.1",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#000",
};

const countStyle = {
  fontSize: "12px",
  color: "#555",
};

const iconStyle = {
  width: "35px",
  height: "auto",
  display: "block",
};

export default CartIcon;