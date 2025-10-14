const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lesson 9: Create the reusable MySQL connection pool with the local credentials
// students set up in MySQL Workbench for the ecommerce schema.
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ecommerce",
});

app.post('/submit-form', (req, res) => {
  // Lesson 9: Read the form fields sent by the React contact form so we can
  // insert them into the contact table that was created earlier in the lesson.
  const { firstname, lastname, email, subject } = req.body;

  const sqlInsert =
    'INSERT INTO contact (First_name, Last_name, Email, message) VALUES (?, ?, ?, ?)';

  db.query(sqlInsert, [firstname, lastname, email, subject], (error, result) => {
    if (error) {
      console.error('Error inserting contact form submission:', error);
      return res
        .status(500)
        .json({ message: 'There was a problem saving your message. Please try again.' });
    }

    return res.status(201).json({ message: 'Thanks for reaching out!', id: result.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
