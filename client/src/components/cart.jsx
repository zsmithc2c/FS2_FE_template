import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, addToCart, removeFromCart }) => {
  const navigate = useNavigate();

  // 1. Calculate the total price based on quantity
  const total = (cart || []).reduce((acc, item) => {
    const priceNum = parseFloat(item.price?.toString().replace(/[^0-9.-]+/g, "")) || 0;
    const qty = item.quantity || item.Quantity || 1;
    return acc + (priceNum * qty);
  }, 0);

  return (
    <div className="main" style={mainPageStyle}>
      {/* The White "Glass" Box Container */}
      <div style={whiteBoxStyle}>
        <h1 style={titleStyle}>Your Selection</h1>

        {(!cart || cart.length === 0) ? (
          /* --- EMPTY STATE --- */
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Your bag is empty</h2>
            <Link to="/shopping">
              <button className="search-btn" style={{ padding: "10px 30px" }}>
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          /* --- FULL STATE --- */
          <>
            <div style={itemsListStyle}>
              {cart.map((item, index) => (
                <div key={item.id || index} style={itemRowStyle}>
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={imageStyle} 
                  />
                  
                  {/* Product Details */}
                  <div style={{ flex: 1, paddingLeft: "20px" }}>
                    <h3 style={itemNameStyle}>{item.name}</h3>
                    
                    {/* Quantity Controls */}
                    <div style={qtyControlStyle}>
                      <button 
                        onClick={() => removeFromCart(item)} 
                        style={qtyBtnStyle}
                      >
                        -
                      </button>
                      
                      <span style={qtyTextStyle}>
                        {item.quantity || item.Quantity || 1}
                      </span>

                      <button 
                        onClick={() => addToCart(item)} 
                        style={qtyBtnStyle}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ color: "#666", fontSize: "14px" }}>
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Section */}
            <div style={footerStyle}>
              <h2 style={{ margin: "0 0 20px 0", color: "#000", textAlign: "right" }}>
                {/* Fixed: Added commas for thousands and forced 2 decimal places */}
                Total: ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              
              <div style={buttonGroupStyle}>
                {/* Primary Action */}
                <button 
                  className="search-btn" 
                  style={checkoutBtnStyle}
                  onClick={() => alert("Proceeding to Checkout...")}
                >
                  CHECKOUT NOW
                </button>

                {/* Secondary Action - Smaller Link style */}
                <button 
                  onClick={() => navigate("/shopping")} 
                  style={addMoreBtnStyle}
                >
                  + Add more items to your bag
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- STYLES ---

const mainPageStyle = {
  padding: "160px 20px",
  minHeight: "100vh", 
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const whiteBoxStyle = {
  maxWidth: "600px",
  width: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.95)", // High contrast white
  padding: "40px",
  borderRadius: "15px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
  color: "#000"
};

const titleStyle = {
  textAlign: "center",
  color: "#000",
  fontSize: "2.2rem",
  marginBottom: "30px",
  borderBottom: "2px solid #eee",
  paddingBottom: "15px",
  fontWeight: "bold"
};

const itemsListStyle = {
  maxHeight: "45vh",
  overflowY: "auto",
  paddingRight: "10px"
};

const itemRowStyle = { 
  display: "flex", 
  alignItems: "center", 
  padding: "15px 0", 
  borderBottom: "1px solid #f0f0f0" 
};

const imageStyle = { 
  width: "80px", 
  height: "80px", 
  borderRadius: "8px", 
  objectFit: "cover" 
};

const itemNameStyle = { 
  margin: "0 0 5px 0", 
  color: "#000", 
  fontSize: "1.1rem",
  fontWeight: "600"
};

const qtyControlStyle = { 
  display: "flex", 
  alignItems: "center", 
  margin: "10px 0" 
};

const qtyBtnStyle = {
  backgroundColor: "#eee",
  border: "1px solid #ddd",
  borderRadius: "4px",
  width: "30px",
  height: "30px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};

const qtyTextStyle = { 
  margin: "0 15px", 
  fontWeight: "bold", 
  color: "#000" 
};

const footerStyle = { 
  marginTop: "30px" 
};

const buttonGroupStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px"
};

const checkoutBtnStyle = { 
  width: "100%", 
  height: "55px", 
  fontSize: "1.1rem",
  fontWeight: "bold",
  cursor: "pointer"
};

const addMoreBtnStyle = {
  backgroundColor: "transparent",
  color: "#444",
  border: "none",
  textDecoration: "underline",
  fontSize: "0.9rem",
  fontWeight: "500",
  cursor: "pointer",
  padding: "5px 10px"
};

export default Cart;