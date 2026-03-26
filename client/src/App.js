import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

// Style and Page imports
import "./styling/App.css";
import "./styling/nav.css";
import "./styling/footer.css";
import "./styling/home.css";
import "./styling/shopping.css";
import "./styling/about.css";
import "./styling/account.css";
import "./styling/contact.css";
import "./styling/hero.css";
import "./styling/featured.css";

import About from "./pages/about";
import Account from "./pages/account";
import Cart from "./components/cart"; 
import Contact from "./pages/contact";
import Shopping from "./pages/shopping";
import Home from "./pages/home";
import { NavBar, Footer } from "./components/index.js";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // This state only updates when the user clicks "search"
  const [activeSearch, setActiveSearch] = useState("");

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/ecommerce/cart');
      setCart(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      await axios.post('http://localhost:3001/api/ecommerce/cart', {
        name: product.name,
        price: product.price,
        image: product.image
      });
      fetchCart();
    } catch (error) {
      console.error("Add Error:", error);
    }
  };

  const removeFromCart = async (product) => {
    const productId = product?.id;
    if (productId) {
      try {
        await axios.delete(`http://localhost:3001/api/ecommerce/cart/${productId}`);
        fetchCart(); 
      } catch (error) {
        console.error("Delete failed:", error.message);
      }
    }
  };

  return (
    <BrowserRouter>
      <div className="main">
        <NavBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setActiveSearch={setActiveSearch} // Passing the button trigger
          length={cart.reduce((total, item) => total + (item.quantity || item.Quantity || 1), 0)} 
        />
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route 
            path="/shopping" 
            element={<Shopping addToCart={addToCart} activeSearch={activeSearch} />} 
          />
          
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                addToCart={addToCart} 
                removeFromCart={removeFromCart} 
              />
            } 
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;