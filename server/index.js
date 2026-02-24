const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerce",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.getConnection(function(error, connection) {
  if (error) throw error;
  console.log('Connected to database!');
  connection.release();
});

// Contact form
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO contact (First_Name, Last_Name, Email, Message)
    VALUES (?, ?, ?, ?)`;
  const values = [formData.firstname, formData.lastname, formData.email, formData.subject];
  db.execute(sql, values, function(error, results, fields) {
    if (error) throw error;
    console.log('Form data inserted!');
    res.send('Form data inserted!');
  });
});

// Products with search
app.get("/api/ecommerce/products", (req, res) => {
  const searchTerm = req.query.search || '';
  const sql = `SELECT * FROM products WHERE name LIKE ?`;
  const values = [`%${searchTerm}%`];
  db.query(sql, values, (err, result) => {
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});

// Shopping cart
app.get("/api/ecommerce/cart", (req, res) => {
  const sql = "SELECT * FROM cart";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});

app.post("/api/ecommerce/cart", (req, res) => {
  const { id, name, description, image_url, price } = req.body.product;
  const sql = "INSERT INTO cart (id, name, description, image_url, price) VALUES (?, ?, ?, ?, ?)";
  const values = [id, name, description, image_url, price];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.json(result);
  });
});

app.delete("/api/ecommerce/cart/:id", (req, res) => {
  const productId = req.params.id;
  const sql = "DELETE FROM cart WHERE id = ?";
  const values = [productId];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
      return;
    }
    res.json(result);
  });
});

app.use((req, res) => {
  res.status(404).send("Not found");
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
