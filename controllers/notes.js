const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.showNotes = async (req, res)  => {
    const query = "SELECT * FROM notes";
  
    db.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Error retrieving todos" });
      } else {
        res.status(200).json(results);
      }
    });
  };