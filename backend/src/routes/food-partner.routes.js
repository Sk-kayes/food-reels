const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food-partner.controller");
const router = express.Router();

router.get("/", authMiddleware.authUserMiddleware, foodController.getAllFoodPartner);

router.get("/:id", authMiddleware.authUserMiddleware, foodController.getFoodPartnerById);

module.exports = router;