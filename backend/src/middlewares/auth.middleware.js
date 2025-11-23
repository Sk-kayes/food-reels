const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decode.id);
        req.foodPartner = foodPartner;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}

async function authUserMiddleware(req, res, next) {
    let token = req.cookies.token;
    
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.id);
        req.user = user;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware }