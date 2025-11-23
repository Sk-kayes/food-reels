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
    origin: ["http://localhost:5173", "http://192.168.0.105:5173"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res)=> {
    res.json({"message": "Server is working"});
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes);

module.exports = app;