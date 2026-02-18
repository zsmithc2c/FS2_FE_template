import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  // Math: Calculate the total
  const total = cart ? cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + priceNum;
  }, 0) : 0;

  return (
    <div className="main" style={{ padding: "120px 20px", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "white", marginBottom: "40px" }}>Your Selection</h1>

      {(!cart || cart.length === 0) ? (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Your bag is empty</h2>
          <Link to="/shopping"><button className="search-btn" style={{marginTop: "20px"}}>Shop Now</button></Link>
        </div>
      ) : (
        <div style={cartContainerStyle}>
          {cart.map((item, idx) => (
            <div key={idx} style={itemStyle}>
              <img src={item.image} alt="" style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1, paddingLeft: "20px" }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <small>{item.price}</small>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "30px", borderTop: "1px solid #444", paddingTop: "20px" }}>
            <h2 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h2>
            <button className="search-btn" style={{ width: "100%", height: "50px", marginTop: "20px" }} onClick={() => alert("Proceeding to Checkout...")}>
              CHECKOUT NOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const cartContainerStyle = { maxWidth: "600px", margin: "0 auto", backgroundColor: "rgba(255,255,255,0.95)", padding: "30px", borderRadius: "20px", color: "#000" };
const itemStyle = { display: "flex", alignItems: "center", padding: "15px 0", borderBottom: "1px solid #eee" };

export default Cart;