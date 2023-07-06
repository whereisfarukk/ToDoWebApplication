const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});


exports.checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
      try {
        // Get Token from header
        token = authorization.split(' ')[1]
  
        // Verify Token
        const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY)

        console.log(email);
        // Get User from Token
        // req.user = await UserModel.findById(email).select('-password')


        db.query({ email: email }, { password: 0 }, (error, user) => {
            if (error) {
              console.log(error);
              res.status(500).json({ error: "Error retrieving user" });
            } else {
              req.user = user;
              // Place the rest of your code here that depends on `req.user` being set
            }
          });
          console.log('bd is working')          
        next()
      } catch (error) {
        console.log(error)
        res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
      }
    }
    if (!token) {
      res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
      console.log('no token found');
    }
    
  }
  