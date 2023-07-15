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

exports.login = async (req, res,callback) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.render("login", {
      message: "You need to provide both email and password.",
    });
  }

  db.query("SELECT * FROM users WHERE email = ?",[email],async (error, results) => {
      if (error) {
        console.log(error);
        
      }

      if (!results || results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
        res.render("login", {
          message: "The email or its password is incorrect",
        });
      }
      else {
        const username = results[0].name;
        console.log(results[0].email);
         res.render("todo", { username });
         
      }
      try {
        const token = jwt.sign({ email: results[0].email}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_IN });
      //  console.log(token);
        //  req.headers = `Bearer ${token}`; // Set the Authorization header
        //  console.log(req.headers);
        //  res.render("todo", { token: req.headers });

        // req.token = token; // Set the token as a property of the request object
        // console.log(req.token);
        // res.render("todo", { token: req.token });
      } catch (error) {
        console.log(error);
        // Handle the error appropriately
      }
    });
};


exports.register = (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  db.query(
    "SELECT  email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }

      if (results.length > 0) {
        return res.render("register", {
          message: "That email is laready in use",
        });
      } else if (password !== confirm_password) {
        console.log("working");
        return res.render("register", {
          message: "password did not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ? ",
        { name: username, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            // try {
            //   const token = jwt.sign({ email: results[0].email}, 'dhsjf3423jhsdf3423df', { expiresIn: '5d' });
            //   console.log(token);
            // } catch (error) {
            //   console.log(error);
            //   // Handle the error appropriately
            // }
            console.log(results);
            return res.render("login", {
              message: "user registered",
            });
          }
        }
      );
    }
  );
};


// exports.singleTodo = (req, res) => {
//   const q = `SELECT * FROM notes where id=${req.params.id}`;

//   db.query(q, (err, result) => {
//       if (err) return res.json(err);
//       return res.status(200).json(result[0]);
//   });
// };

// exports.updateTodo = (req, res) => {
//   const { text } = req.body;
//   // const q = `UPDATE todolist1 SET firstName ='${firstName}' lastName ='${lastName}' where id=${req.params.id}`;
//   const q = `UPDATE notes SET ? where id=${req.params.id}`;

//   db.query(q, { text }, (err, result) => {
//       if (err) return res.json(err);
//       return res.status(200).json(result);
//   });
// }

// exports.deleteSingleTodo = (req, res) => {

//   const q = `DELETE FROM notes  WHERE id=${req.params.id}`;

//   db.query(q, (err, result) => {
//       if (err) return res.json(err);
//       return res.status(200).json({ data: "todo deleted" });
//   });
// }
