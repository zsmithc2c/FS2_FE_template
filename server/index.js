require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/api/ecommerce/cart', (req, res) => {
  const sqlSelect = "SELECT * FROM cart";
  db.query(sqlSelect, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.post('/api/ecommerce/cart', (req, res) => {
  const { name, price, image } = req.body;
  const sql = `
    INSERT INTO cart (name, price, image, quantity) 
    VALUES (TRIM(?), ?, ?, 1) 
    ON DUPLICATE KEY UPDATE quantity = quantity + 1
  `;
  db.query(sql, [name, price, image], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).send("Success");
  });
});

app.delete('/api/ecommerce/cart/:id', (req, res) => {
  const id = req.params.id;
  const sqlUpdate = "UPDATE cart SET quantity = quantity - 1 WHERE id = ? AND quantity > 1";
  
  db.query(sqlUpdate, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      const sqlDelete = "DELETE FROM cart WHERE id = ?";
      db.query(sqlDelete, [id], (err, deleteResult) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Item removed' });
      });
    } else {
      res.status(200).json({ message: 'Quantity decreased' });
    }
  });
});

app.get("/api/ecommerce/products", (req, res) => {
  const rawSearch = req.query.search || '';
  
  if (!rawSearch || rawSearch.toLowerCase() === 'all') {
    return db.query("SELECT * FROM products", (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  }

  let searchTerm = rawSearch.toLowerCase();
  if (searchTerm.endsWith('s')) {
    searchTerm = searchTerm.slice(0, -1);
  }

  const sql = `
    SELECT * FROM products 
    WHERE LOWER(category) = ? 
    OR (category IS NULL AND name LIKE ?)
  `;
  const values = [searchTerm, `%${searchTerm}%`];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});