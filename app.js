const express = require("express");
const path = require('path');
const mysql = require("mysql");
const cookieParser = require('cookie-parser');

const dotenv = require("dotenv");


dotenv.config({path: './.env'});

const app = express();



const db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
// parse JSON bodies (as sent by API cliets)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL Connected...")
    }
})

//Define Routers
app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));



app.listen(5000,() => {
    console.log("server started on port 5000");
})


// to download from the data base //
// app.get('/users',(res,req)=>{
//     db.query('SELECT * FROM users',(err,rows,fields)=>{
//         if(!err)
//         console.log(rows);
//         else
//         console.log(err);
//     })
// });


// 1.First its going to app.js where app.use('/', require('./routes/pages')); when we press /
// then it will going to routes folder pages.js
// 2.After going to pages.js ,it will render the register page.
// 3.Then register page will return a path auth/register.
// 4.In the app.js ,app.use('/auth',require('./routes/auth')); this command will execute ,cause register page return the path starting with auth.
// 5.Then it will go to the routes/auth and the router.post will execute.This method had '/register' which comes from the register.hbs .Here only /register written ,beacause auth/ already executed from app.js 
// 6.Then authController.register will be called ,and it will execute the auth.js file  which was in the controller folder.



// code for showing all the notes in the todo interface after going to interface //
// app.get("/auth/todo", (req, res) => {
//     const query = "SELECT * FROM notes";
  
//     db.query(query, (error, results) => {
//       if (error) {
//         console.log(error);
//         res.status(500).json({ error: "Error retrieving todos" });
//       } else {
//         res.status(200).json(results);
//       }
//     });
//   });
  