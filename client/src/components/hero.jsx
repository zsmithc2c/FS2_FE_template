import React from "react";

const Hero = () => {
  return (
    <>
      <div id="hero">
        <h3 id="hero-promo"> Vanessa's Jewelry Store</h3>
        
        {/* Added textAlign center to keep the words perfectly in the middle of the box */}
        <div style={{
          backgroundColor: "rgba(49, 96, 123, 0.7)", 
          padding: "10px 20px",
          borderRadius: "5px",
          display: "inline-block",
          marginTop: "10px",
          textAlign: "center" 
        }}>
          <p id="hero-text" style={{ margin: "0", color: "white", display: "inline" }}>
            Simple. Sophisticated. Sustainable. Elevate your everyday look with our collection of minimalist essentials.
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;