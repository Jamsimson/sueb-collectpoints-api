const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

// MySQL connection
const connection = mysql.createConnection({
    host: "db4free.net",
    port:3306,
    user: "motana",
    password: "jesusloveme",
    database: "mydatabase",
})
// Start connecting MySQL database
connection.connect((err) =>{
    if(err){
        console.log(`Error connecting to MySQL database = ${err}`);
    }
    else{
        console.log(`MySQL successfully connected`);
    }
} )

// logger middleware
app.use((req,res,next) =>{
    req.time = new Date(Date.now()).toString();
    console.log(req.method,req.hostname, req.path, req.time);
    next();
});

// start
app.get("/", (req, res) => {
    return res.status(200).json({message: "Welcome to SUEB collect point"})
  });

// Create account
app.post(`/create`,async (req,res) => {
    const {username,phonenumber,point} = req.body;
    
    try {
        connection.query(
            `INSERT INTO Users (username, phonenumber, point) VALUES (?,?,?)`,
            [username,phonenumber,point],
            (err,results,fields) => {
                if(err){
                    console.log(`Error while inserting a user in database`);
                    return res.status(400).send()
                }
                return res.status(201).json({message: "New user successfully"})
            }

        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

// Read all data
app.get(`/read`,async (req,res) => {
    try {
        connection.query(
            `SELECT * FROM Users`, (err,results,fields) =>{
                if (err) {
                    console.log(err);
                    return res.status(400).send()
                } else {
                    return res.status(200).json(results)
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

// Get single user from db
app.get(`/read/:phone`,async (req,res) =>{
    const phone = req.params.phone;

    try {
        connection.query(
            `SELECT * FROM Users WHERE phonenumber = ?`,phone, (err,results,fields) =>{
                if (err) {
                    console.log(err);
                    return res.status(400).send()
                } else {
                    return res.status(200).json(results)
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

// Increase points single user
app.patch(`/update/:phone`,(req,res) =>{
    const phone = req.params.phone;
    const point = req.body.point

    try {
        connection.query(
            `UPDATE Users SET point =  point + ? WHERE phonenumber = ?` ,[point,phone], (err,results,fields) =>{
                if (err) {
                    console.log(err);
                    return res.status(400).send()
                } else {
                    return res.status(200).json(results)
                }
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})



// port 4000
app.listen(4000, () =>{
    console.log(`Server is run on port 4000`);
})

