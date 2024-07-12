const Model = require('../Models/user');

exports.getStart = (req, res, next) => {
    return res.status(200).json({message: "Welcome to SUEB collect point"})
};

// create account
exports.createNewAccount = async (req,res,next) => {
    const data = new Model(req.body)
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

// read all data
exports.readAllData = async (req,res,next) =>{
    try {
        const data = await Model.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}


// get single user from db
exports.getSingleData = async (req,res,next) => {
    try {
        const data = await Model.findOne({"phonenumber":req.params.phone})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

// Update points single user
exports.updatePoint = async (req,res,next) => {
    try {
        const data = await Model.updateOne({"phonenumber":req.params.phone},{$inc:{"point":req.body.point}})
        res.status(200).json({message:'Point update successful'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}