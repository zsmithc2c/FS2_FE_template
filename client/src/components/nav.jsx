import React from "react";
import acct from "../images/acct.png";
import cartlogo from "../images/cartlogo.png";
import { Link } from "react-router-dom";

const NavBar = ({ length, searchTerm, setSearchTerm, setActiveSearch }) => {

  const handleClear = () => {
    setSearchTerm("");
    setActiveSearch("");
  };

  const categories = ["Rings", "Necklaces", "Bracelets", "Earrings"];

  return (
    <div className="nav" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* UPPER SECTION */}
      <div className="nav-items" style={{ margin: "0", paddingBottom: "0px", display: "flex", alignItems: "center" }}>
        {/* LOGO FIX: Made smaller (from 50px to 40px) */}
        <img
          className="icons"
          id="logo"
          src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/12/jewelry-logo.jpg"
          alt="Vanessa's Jewelry Logo"
          style={{
            borderRadius: "50%",
            aspectRatio: "1/1",
            height: "40px", 
            objectFit: "cover",
            border: "1.5px solid #000",
            backgroundColor: "white",
            padding: "1px"
          }}
        />
        
        <div className="search-container" style={{ display: "flex", alignItems: "center", gap: "0px", marginLeft: "auto", marginRight: "auto" }}>
          <input
            type="text"
            className="search-box"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "250px", marginRight: "0px", borderRight: "none", borderRadius: "4px 0 0 4px" }}
          />
          <button 
            className="search-btn" 
            onClick={() => setActiveSearch(searchTerm)}
            style={{ marginLeft: "0px", borderRadius: "0 4px 4px 0" }}
          >
            search
          </button>
          
          {searchTerm && (
            <span 
              onClick={handleClear} 
              style={{ cursor: "pointer", color: "gray", fontSize: "12px", textDecoration: "underline", marginLeft: "10px" }}
            >
              clear
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img className="icons" src={acct} alt="Account" />
          
          {/* CART FIX: Adjusted vertical alignment to move it up */}
          <Link
            to="/cart"
            id="cart-btn"
            style={{
              display: "flex",
              alignItems: "center", 
              marginRight: "20px",
              gap: "4px",
              textDecoration: "underline",
              transform: "translateY(-2px)" 
            }}
          >
            <span style={{ fontSize: "14px" }}>Cart ({length ?? 0})</span>
            <img 
              src={cartlogo} 
              alt="Cart" 
              style={{ 
                width: "18px", 
                height: "auto" 
              }} 
            />
          </Link>
        </div>
      </div>

      {/* LOWER BLUE SECTION */}
      <div id="links" style={{ 
        display: "flex", 
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
        gap: "120px", 
        margin: "0px auto",       
        padding: "12px 0",
        width: "100%",
        backgroundColor: "#31607b" 
      }}>
        {/* Added 15px font size to all links below */}
        <Link className="navlink" to="/" style={{ margin: "0", fontSize: "15px" }}>Home</Link>
        
        <div className="dropdown" style={{ position: "relative", display: "inline-block" }}>
          <Link className="navlink" to="/shopping" style={{ margin: "0", fontSize: "15px" }}>
            Shopping ▾
          </Link>
          <div className="dropdown-content" style={{
            position: "absolute",
            top: "100%", 
            left: "0",
            backgroundColor: "#fff",
            minWidth: "160px",
            boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
            zIndex: 10
          }}>
            <button onClick={handleClear} style={dropItemStyle}>All Items</button>
            {categories.map(cat => (
              <button key={cat} style={dropItemStyle} onClick={() => { setSearchTerm(cat); setActiveSearch(cat); }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Link className="navlink" to="/about" style={{ margin: "0", fontSize: "15px" }}>About Us</Link>
        <Link className="navlink" to="/contact" style={{ margin: "0", fontSize: "15px" }}>Contact</Link>
      </div>
    </div>
  );
};

const dropItemStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "none",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "14px",
  color: "#333",
  borderBottom: "1px solid #eee"
};

export default NavBar;