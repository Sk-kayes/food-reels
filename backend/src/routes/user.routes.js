const express = require("express");
const userController = require("../controllers/user.controller");
const { authUserMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/all", userController.getAllUsers);
router.get("/me", authUserMiddleware, userController.getCurrentUser);
router.get("/:id", userController.getUserById);

module.exports = router;