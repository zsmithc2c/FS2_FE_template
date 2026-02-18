import React from "react";
import acct from "../images/acct.png";
import cartlogo from "../images/cartlogo.png";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <>
      <div className="nav">
        <div className="nav-items">
          {/* PASTE YOUR LOGO IMAGE ADDRESS (URL) IN THE src BELOW */}
          <img 
            className="icons" 
            id="logo" 
            src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/12/jewelry-logo.jpg" 
            alt="Vanessa's Jewelry Logo"
            style={{ 
              borderRadius: "50%",      // Makes it a circle like your screenshot
              aspectRatio: "1/1",       // Forces it to be a perfect square so the circle isn't an oval
              objectFit: "cover",       // Ensures the image fills the circle nicely
              border: "1.5px solid #000", // Adds the thin dark ring around the logo
              backgroundColor: "white",  // Makes the circle stand out against the grey nav bar
              padding: "1px"            // Optional: adds a tiny bit of space between image and border
            }} 
          />
          
          <input
            type="text"
            className="search-box"
            placeholder="search"
          ></input>
          <button className="search-btn">search</button>

          <img className="icons" src={acct} alt="Account"></img>

          <Link to="/cart" id="cart-btn">
            Cart ({props.length ?? 0})
            <img src={cartlogo} alt="Cart"></img>
          </Link>
        </div>

        <div id="links">
          <Link className="navlink" to="/">Home</Link>
          <Link className="navlink" to="/shopping">Shopping</Link>
          <Link className="navlink" to="/about">About Us</Link>
          <Link className="navlink" to="/contact">Contact</Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;