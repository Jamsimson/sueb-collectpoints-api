const db = require('../service/db');

exports.getStart = (req, res, next) => {
    return res.status(200).json({message: "Welcome to SUEB collect point"})
};

// create account
exports.createNewAccount = async (req,res,next) => {
    const {username,phonenumber,point} = req.body;
    try {
        const [rows] = await db.query(`INSERT INTO Users (username, phonenumber, point) VALUES (?,?,?)`,[username,phonenumber,point])
        res.status(201).json({message:"New user successfully"});
    } catch (err) {
        console.log(`There is an error: ${err}`);
        return res.status(500).send()
    }
}

// read all data
exports.readAllData = async (req,res,next) =>{
    try {
        const [rows] = await db.query(`SELECT * FROM Users`)
        return res.status(201).json(rows);
    } catch (err) {
        console.log(`There is an error: ${err}`);
        return res.status(500).send()
    }
}


// get single user from db
exports.getSingleData = async (req,res,next) => {
    const phone = req.params.phone;
    try {
        const [rows] = await db.query(`SELECT * FROM Users WHERE phonenumber = ?`,phone)
        return res.status(201).json(rows);
    } catch (err) {
        console.log(`There is an error: ${err}`);
        return res.status(500).send()
    }
}

// Update points single user
exports.updatePoint = async (req,res,next) => {
    const phone = req.params.phone;
    const point = req.body.point

    try {
        const [rows] = await db.query(`UPDATE Users SET point =  point + ? WHERE phonenumber = ?`,[point,phone])
        return res.status(201).json({message:"Update point succesfully"});
    } catch (err) {
        console.log(`There is an error: ${err}`);
        return res.status(500).send()
    }
}