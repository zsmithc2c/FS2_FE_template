import React from "react";

const Featured = () => {
  return (
    <>
      <div id="gallery-head">
        <h1> Gallery </h1>
      </div>
      <div id="card-container">
        
        {/* Product 1 */}
        <div className="featured-card">
          <img
            className="img"
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"
            alt="Jewelry Item 1"
          />
          <h3>Gold Necklace</h3>
        </div>

        {/* Product 2 */}
        <div className="featured-card">
          <img
            className="img"
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500"
            alt="Jewelry Item 2"
          />
          <h3>Silver Ring</h3>
        </div>

        {/* Product 3 */}
        <div className="featured-card">
          <img
            className="img"
            src="https://images.unsplash.com/photo-1583167616102-d8d4b7d02c6c?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Jewelry Item 3"
          />
          <h3>Pearl Earrings</h3>
        </div>

        {/* Product 4 */}
        <div className="featured-card">
          <img
            className="img"
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500"
            alt="Jewelry Item 4"
          />
          <h3>Crystal Bracelet</h3>
        </div>

        {/* Product 5 */}
        <div className="featured-card">
          <img
            className="img"
            src="https://images.unsplash.com/photo-1588444650733-d0767b753fc8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhbW9uZCUyMGVhcnJpbmdzfGVufDB8fDB8fHww"
            alt="Jewelry Item 5"
          />
          <h3>Diamond Studs</h3>
        </div>
        
      </div>
    </>
  );
};

export default Featured;