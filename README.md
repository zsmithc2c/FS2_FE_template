# Full Stack 2: Lesson 13 — Adding Search Functionality

## Lesson Overview

In this lesson, students learn how to create a search function for their products page using `useState` and GET requests, use MySQL `SELECT` statements with the `LIKE` operator to filter data from a database table, and display a list of relevant products to the user.

### Learning Objectives

- Create a search function for the products page using `useState` and GET requests
- Use MySQL `SELECT` statements to select specific data from a data table
- Display a list of relevant products to the user

### Prerequisites

Before starting this lesson, students should be comfortable with:

- `useState` and `useEffect` hooks in React
- Passing props between components
- MySQL `SELECT` statements

---

## Project Structure

This is a full-stack ecommerce application with a **React frontend** and a **Node/Express backend** connected to a **MySQL database**.

```
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── nav.jsx      # Navigation bar with search input
│   │   │   ├── footer.jsx   # Footer component
│   │   │   ├── hero.jsx     # Hero/banner section
│   │   │   ├── featured.jsx # Featured products gallery
│   │   │   ├── contactForm.jsx # Contact form component
│   │   │   └── index.js     # Component exports
│   │   ├── pages/           # Page-level components
│   │   │   ├── home.js
│   │   │   ├── shopping.js  # Products page with search filtering
│   │   │   ├── about.js
│   │   │   ├── contact.js
│   │   │   ├── account.js
│   │   │   └── cart.js
│   │   ├── styling/         # CSS files for each component/page
│   │   ├── images/          # Static image assets
│   │   └── App.js           # Main app with routing and search state
│   └── package.json
├── server/                  # Node/Express backend
│   ├── index.js             # API endpoints and MySQL connection
│   └── package.json
└── README.md
```

---

## How the Search Feature Works

The search functionality is the core feature of this lesson. Here's how it flows through the application:

### 1. State Management in App.js (Section 1.1)

Search state is created at the top level of the app using the `useState` hook:

```jsx
const [searchTerm, setSearchTerm] = useState("");
```

This state is "lifted up" to `App.js` because **two sibling components** need access to it — the `NavBar` (where the user types) and the `Shopping` page (where results are filtered). By keeping state in the parent, both children can share the same data.

### 2. Passing Props (Section 1.2)

The `searchTerm` and `setSearchTerm` are passed down as **props**:

- **To NavBar:** Both `searchTerm` (to display the current value) and `setSearchTerm` (to update it when the user types)
- **To Shopping:** Just `searchTerm` (to filter the displayed products)

```jsx
<NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
<Route path="/shopping" element={<Shopping searchTerm={searchTerm} />} />
```

In React, "props" is short for "properties" — they are used to pass data from a parent component to a child component, similar to HTML attributes.

### 3. Search Input in NavBar (Section 1.2)

The NavBar component receives the props and wires them to an `<input>` element:

```jsx
const { searchTerm, setSearchTerm } = props;

const handleInputChange = (e) => {
  setSearchTerm(e.target.value);
};
```

Every keystroke calls `setSearchTerm`, which updates the state in `App.js`, which re-renders both `NavBar` and `Shopping` with the new value.

### 4. Filtering Products on the Frontend (Section 1.3)

In the `Shopping` component, a `useEffect` hook watches for changes to either `products` or `searchTerm` and updates a `filteredProducts` array:

```jsx
const [filteredProducts, setFilteredProducts] = useState([]);

useEffect(() => {
  setFilteredProducts(
    products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}, [products, searchTerm]);
```

Key concepts here:
- **`useEffect` dependency array** `[products, searchTerm]` — the effect re-runs whenever either value changes
- **`.filter()`** — creates a new array containing only products whose name matches
- **`.toLowerCase()`** — makes the search case-insensitive
- **`.includes()`** — checks if the product name contains the search term (partial match)

The `renderProducts` function then maps over `filteredProducts` instead of `products` to display only matching items.

### 5. Server-Side Search with MySQL LIKE (Section 2.1)

The Express backend also supports search via a query parameter:

```js
app.get("/api/ecommerce/products", (req, res) => {
  const searchTerm = req.query.search || '';
  const sql = `SELECT * FROM products WHERE name LIKE ?`;
  const values = [`%${searchTerm}%`];
  db.query(sql, values, (err, result) => {
    res.json(result);
  });
});
```

Key concepts:
- **`req.query.search`** — extracts the `?search=` parameter from the URL (e.g., `/api/ecommerce/products?search=shirt`)
- **`|| ''`** — defaults to an empty string if no search term is provided (returns all products)
- **MySQL `LIKE` operator** — filters rows where the column matches a pattern
- **`%` wildcards** — `%searchTerm%` means "anything before, the search term, then anything after" (partial match)
- **Parameterized query (`?`)** — prevents SQL injection by using prepared statements

---

## Additional Features

### Shopping Cart
- **Add to cart:** POST request to `/api/ecommerce/cart` saves the product to the database and updates local state
- **Remove from cart:** DELETE request to `/api/ecommerce/cart/:id` removes the product
- **Persistence:** Cart data is also stored in `localStorage` for client-side persistence

### Contact Form
- Collects first name, last name, email, and message
- Submits via POST to `/submit-form`, which inserts into the `contact` MySQL table

### Navigation
- Uses `react-router-dom` for client-side routing between Home, Shopping, About, Contact, and Account pages

---

## Setup & Installation

### Prerequisites
- Node.js (v16+)
- MySQL running locally

### Database Setup

Create the MySQL database and tables:

```sql
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  price DECIMAL(10, 2)
);

CREATE TABLE cart (
  id INT NOT NULL,
  name VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255),
  price DECIMAL(10, 2)
);

CREATE TABLE contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  First_Name VARCHAR(255),
  Last_Name VARCHAR(255),
  Email VARCHAR(255),
  Message TEXT
);

-- Insert some sample products
INSERT INTO products (name, description, image_url, price) VALUES
('Blue T-Shirt', 'A comfortable blue t-shirt', 'https://via.placeholder.com/150', 19.99),
('Red Sneakers', 'Stylish red sneakers', 'https://via.placeholder.com/150', 59.99),
('Black Hoodie', 'Warm black hoodie', 'https://via.placeholder.com/150', 39.99),
('White Cap', 'Classic white baseball cap', 'https://via.placeholder.com/150', 14.99),
('Green Jacket', 'Lightweight green jacket', 'https://via.placeholder.com/150', 79.99);
```

### Running the App

**1. Update MySQL credentials** in `server/index.js` if your MySQL user/password differ from `root`/`password`.

**2. Install dependencies and start the server:**
```bash
cd server
npm install
npm run devStart
```

**3. Install dependencies and start the client:**
```bash
cd client
npm install
npm start
```

The client runs on `http://localhost:3000` and the server on `http://localhost:3001`.

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **useState** | A React hook that creates a state variable and a function to update it |
| **useEffect** | A React hook that runs side effects (like API calls or filtering) when dependencies change |
| **Props** | Short for "properties" — used to pass data from parent to child components |
| **LIKE operator** | A MySQL operator that filters rows based on a pattern (used with `%` wildcards) |
| **Query parameter** | Data appended to a URL after `?` (e.g., `?search=shirt`), accessed via `req.query` in Express |
| **Parameterized query** | A SQL query that uses `?` placeholders to safely insert values and prevent SQL injection |
| **filter()** | A JavaScript array method that returns a new array with only elements that pass a test |
| **includes()** | A JavaScript string method that checks whether a string contains a specified substring |
