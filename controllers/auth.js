const mysql = require("mysql");
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
        console.log(req.body);
        const  email= req.body.email;
        const password = req.body.password;
        if(!email || !password){
            return res.render("login",{
                message: 'you need email and password.'
            })
        }
        db.query('SELECT * FROM users WHERE email = ?',[email], async (error,results) => {
            if(error){
                console.log(error);
            }

            if(!results || !(await bcrypt.compare(password,results[0].password))){
                res.render('login',{
                    message: 'the email or its password is incorrect'
                })
            }
            else{
                console.log('login success');
            }
        })
}

exports.register = (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    
    db.query('SELECT  email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register',{
                message: 'That email is laready in use'
            })
        } else if(password !== confirm_password){
            console.log("working");
            return res.render('register', {
                message: 'password did not match'
            }); 
        }

        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ? ', {name: username,email:email,password:hashedPassword}, (error,results) =>{
            if(error){
                console.log(error);
            } else{
                console.log(results);
                return res.render('register', {
                    message: 'user registered'
                });
            }
        })

    });
 
}
