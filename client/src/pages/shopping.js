import React, { useState } from "react";

const Shopping = ({ addToCart }) => {
  const [products] = useState([
{
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
      name: "Crescent Gold Necklace",
      description: "Handcrafted silver band inspired by nature.",
      price: "$1,800.00"
    },
    {
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
      name: "Silver Ring",
      description: "Classic freshwater pearls on 14k gold hooks.",
      price: "$800.00"
    },
    {
      image: "https://images.unsplash.com/photo-1583167616102-d8d4b7d02c6c?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Pearl Earrings",
      description: "Elegant minimalist necklace for daily wear.",
      price: "$2,600.00"
    },
    {
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500",
        name: "Crystal Bracelet",
        description: "Delicate chain with a polished finish.",
        price: "$5,400.00"
      },
      {
        image: "https://images.unsplash.com/photo-1588444650733-d0767b753fc8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhbW9uZCUyMGVhcnJpbmdzfGVufDB8fDB8fHww",
        name: "Diamond Studs",
        description: "Elegant minimalist necklace for daily wear.",
        price: "$3,800.00"
      },
      {
        image: "https://images.unsplash.com/photo-1705575554647-4dfba6d7cdd5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW1lcmFsZCUyMHN0b25lfGVufDB8fDB8fHww",
        name: "Emerald Pendant",
        description: "Elegant minimalist necklace for daily wear.",
        price: "$2,500.00"
      },
      {
        image: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhbW9uZCUyMGJyYWNlbGV0fGVufDB8fDB8fHww",
        name: "Tennis Bracelet",
        description: "Elegant minimalist necklace for daily wear.",
        price: "$5,300.00"
      },
      {
        image: "https://images.unsplash.com/photo-1565058358324-d71314647c4c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Infinity Ring",
        description: "Elegant minimalist necklace for daily wear.",
        price: "$1,000.00"
      },
      {
        image: "https://images.unsplash.com/photo-1767921777873-81818b812a4d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVubmlzJTIwYnJhY2VsZXR8ZW58MHx8MHx8fDA%3D",
        name: "Emerald & Gold Tennis Bracelet",
        description: "Elegant minimalist necklace for daily wear.",
        price: "$5,000.00"
      }      
  ]);

  return (
    <div style={{ padding: "120px 20px", textAlign: "center" }}>
      <h1 style={{ color: "black", marginBottom: "40px" }}>Luxury Collection</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
        {products.map((product, idx) => (
          <div key={idx} style={cardStyle}>
            <img src={product.image} alt={product.name} style={imgStyle} />
            <h2 style={{ color: "black", fontSize: "1.2rem" }}>{product.name}</h2>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{product.description}</p>
            <h3 style={{ color: "black" }}>{product.price}</h3>
            <button 
              onClick={() => addToCart(product)} 
              style={btnStyle}
              onMouseOver={(e) => e.target.style.opacity = "0.8"}
              onMouseOut={(e) => e.target.style.opacity = "1"}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "15px",
  width: "260px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
};

const imgStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "15px"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px"
};

export default Shopping;