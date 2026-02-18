import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Style imports (Keep your original styling)
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

// Page imports
import About from "./pages/about";
import Account from "./pages/account";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Shopping from "./pages/shopping";
import Home from "./pages/home";

// Component imports
import { NavBar } from "./components/index.js";
import { Footer } from "./components/index.js";

function App() {
  // 1. The GLOBAL cart state
  const [cart, setCart] = useState([]);

  // 2. The function to add items
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <BrowserRouter>
      <div className="main">
        {/* 3. Passing the length to the NavBar for the blue link */}
        <NavBar length={cart.length} />
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* 4. Passing 'addToCart' to Shopping page */}
          <Route path="/shopping" element={<Shopping addToCart={addToCart} />} />
          
          {/* 5. Passing the 'cart' list to the Cart page */}
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// 6. This line MUST be here to fix the "no exports" error
export default App;