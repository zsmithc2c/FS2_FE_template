import React, { useEffect, useState } from "react";
import axios from "axios";
import productImg from "../images/productImg.png";

const placeholderProducts = Array.from({ length: 5 }, (_, index) => ({
  id: `placeholder-${index}`,
  image: productImg,
  name: "Add a product here",
  description: "",
  price: "",
}));

const Featured = () => {
  const [products, setProducts] = useState(placeholderProducts);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/products`
        );

        const allProducts = Array.isArray(response.data) ? response.data : [];
        if (allProducts.length) {
          setProducts(allProducts.slice(0, placeholderProducts.length));
        }
      } catch (error) {
        console.error("Failed to load featured products", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      <div id="gallery-head">
        <h1> Gallery </h1>
      </div>
      <div id="card-container">
        {products.map((product, index) => (
          <div className="featured-card" key={product.id ?? index}>
            <img
              className="img"
              src={product.image_url || product.image || productImg}
              alt={product.name ? `${product.name} product image` : "Featured product"}
            />
            <h3>{product.name || "Add a product here"}</h3>
            {product.description && <p>{product.description}</p>}
            {product.price && <p>{product.price}</p>}
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;
