import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  const total = cart ? cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + priceNum;
  }, 0) : 0;

  return (
    <div className="main" style={{ paddingTop: "150px", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "white", marginBottom: "30px", fontSize: "2.5rem" }}>Your Selection</h1>

      {(!cart || cart.length === 0) ? (
        <div style={{ textAlign: "center", color: "white", backgroundColor: "rgba(0,0,0,0.7)", padding: "50px", borderRadius: "20px" }}>
          <h2>Your bag is currently empty.</h2>
          <Link to="/shopping">
            <button className="search-btn" style={{ marginTop: "20px", padding: "10px 30px" }}>Shop Collection</button>
          </Link>
        </div>
      ) : (
        <div style={cartBoxStyle}>
          {cart.map((item, idx) => (
            <div key={idx} style={itemRowStyle}>
              <img src={item.image} alt="" style={cartImgStyle} />
              <div style={{ flex: 1, paddingLeft: "20px" }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: 0, opacity: 0.7 }}>{item.price}</p>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "30px", borderTop: "2px solid #eee", paddingTop: "20px" }}>
            <h2 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h2>
            <button className="search-btn" style={{ width: "100%", height: "55px", marginTop: "20px", fontWeight: "bold" }}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const cartBoxStyle = {
  width: "90%",
  maxWidth: "600px",
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "20px",
  color: "black",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const itemRowStyle = {
  display: "flex",
  alignItems: "center",
  padding: "15px 0",
  borderBottom: "1px solid #eee"
};

const cartImgStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "10px",
  objectFit: "cover"
};

export default Cart;