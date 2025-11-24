require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const authRoutes = require("../src/routes/auth.routes");
const foodRoutes = require("../src/routes/food.routes");
const foodPartnerRoutes = require("../src/routes/food-partner.routes");
const userRoutes = require("../src/routes/user.routes");

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'https://food-reels-t369.vercel.app', 'https://food-reels-backend-npse.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", (req, res)=> {
    res.json({"message": "Server is working"});
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;