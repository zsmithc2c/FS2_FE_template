import React from "react";

const About = () => {
  return (
    <>
      <div id="about" style={{ padding: "100px 20px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        
        <div className="about-content-box" style={{ 
            backgroundColor: "#ffffff", 
            padding: "40px", 
            borderRadius: "15px", 
            boxShadow: "0px 10px 30px rgba(0,0,0,0.3)" 
        }}>
          {/* TITLE AT THE TOP - BLACK */}
          <h1 style={{ color: "#000000", marginBottom: "30px", fontSize: "2.8rem" }}>
            About Us
          </h1>

          {/* IMAGE IN THE MIDDLE */}
          <img 
            src="https://www.whiteflash.com/articlefiles/best-jewelry-stores-in-the-world/buccellati.jpg" 
            alt="Vanessa's Jewelry Boutique" 
            style={{ 
              width: "100%", 
              maxHeight: "350px", 
              objectFit: "cover", 
              borderRadius: "10px",
              marginBottom: "30px"
            }} 
          />

          {/* TEXT AT THE BOTTOM - BLACK */}
          <h3 style={{ 
              lineHeight: "1.8", 
              fontWeight: "400", 
              color: "#000000", 
              margin: "0" 
          }}>
            At Vanessa’s Jewelry, we believe that luxury should be accessible and timeless. 
            We specialize in minimalist designs crafted from the highest quality materials, 
            ensuring that your favorite pieces last for years, not just seasons. 
            From our signature gold chains to our ethically sourced gemstones, 
            we focus on the fine details so you can shine effortlessly every day.
          </h3>
        </div>
      </div>
    </>
  );
};

export default About;