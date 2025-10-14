const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lesson 9 (updated): build a reusable MySQL connection pool. We now read the
// connection details from environment variables so the Express server can reach
// databases that are running outside of the Codespace container (for example,
// the schema you created in MySQL Workbench on your machine). If the variables
// are not provided we fall back to the original lesson defaults so the sample
// still works with a local MySQL instance inside the container.
const {
  MYSQL_HOST = 'localhost',
  MYSQL_PORT = '3306',
  MYSQL_USER = 'root',
  MYSQL_PASSWORD = 'password',
  MYSQL_DATABASE = 'ecommerce',
} = process.env;

const db = mysql.createPool({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  // A tiny connection timeout helps surface unreachable hosts quickly when the
  // app is pointed at a database that is not accessible from the container.
  connectTimeout: 5000,
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
