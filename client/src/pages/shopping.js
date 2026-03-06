import React, { useState, useEffect } from "react";
import axios from "axios";

const Shopping = ({ addToCart, activeSearch }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/ecommerce/products?search=${activeSearch}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Only triggers when the search button is clicked in the NavBar
  useEffect(() => {
    fetchProducts();
  }, [activeSearch]);

  return (
    <div style={{ padding: "120px 20px", textAlign: "center" }}>
      <h1 style={{ color: "black", marginBottom: "30px" }}>Luxury Collection</h1>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
        {products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <img src={product.image} alt={product.name} style={imgStyle} />
            <h2 style={{ color: "black", fontSize: "1.2rem" }}>{product.name}</h2>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>{product.description}</p>
            <h3 style={{ color: "black" }}>
              ${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <button 
              onClick={() => addToCart(product)} 
              style={btnStyle}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const cardStyle = { backgroundColor: "white", padding: "20px", borderRadius: "15px", width: "260px", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" };
const imgStyle = { width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" };
const btnStyle = { width: "100%", padding: "12px", backgroundColor: "black", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" };

export default Shopping;