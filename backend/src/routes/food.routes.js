const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})

router.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);


router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFood);

router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFood);

router.get("/saved", authMiddleware.authUserMiddleware, foodController.getSavedFood);

router.get("/:id", authMiddleware.authUserMiddleware, foodController.getFoodItemById);

module.exports = router;