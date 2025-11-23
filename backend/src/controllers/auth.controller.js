const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User
async function registerUser(req, res) {
    const { fullname, email, password } = req.body;

    const isExistUser = await userModel.findOne({ email });

    if (isExistUser) {
        return res.status(400).json({ message: "Useer already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullname,
        email,
        password: hashPassword,
    });

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        message: "User loggedin successfully",
        token: token,
        user: {
            _id: user._id,
            email: user.email,
        },
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Email or Password is Invalid",
        });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(400).json({
            message: "Email or Password is Invalid",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        message: "User loggedin successfully",
        token: token,
        user: {
            _id: user._id,
            email: user.email,
        },
    });
}

function logoutuser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully",
    });
}

// Food Partner
async function registerFoodPartner(req, res) {
    const { name, email, password, phone, address, contactName } = req.body;

    const isExistUser = await foodPartnerModel.findOne({ email });
    if (isExistUser) {
        return res.status(400).json({ message: "Foodpartner  already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await foodPartnerModel.create({
        name,
        email,
        password: hashPassword,
        phone,
        address,
        contactName,
    });

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.status(201).json({
        message: "Foodpartner register successfully",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
            contactName: user.contactName
        },
    });
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const user = await foodPartnerModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Email or Password is Invalid",
        });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(400).json({
            message: "Email or Password is Invalid",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.status(200).json({
        message: "Foodpartner loggedin successfully",
        user: {
            _id: user._id,
            email: user.email,
        },
    });
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Foodpartner logged out successfully",
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutuser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
};