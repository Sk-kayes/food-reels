const { v4: uuid } = require('uuid');
const foodmodel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const StorageService = require("../services/storage.service");

async function createFood(req, res) {
    const uploadResult = await StorageService.uploadFile(req.file.buffer, uuid());

    const foodItem = foodmodel.create({
        name: req.body.name,
        video: uploadResult.url,
        description: req.body.description,
        foodPartner: req.foodPartner._id
    });

    res.status(201).json({
        message: "Food Created Successfully",
        food: foodItem
    });
};

async function getFoodItems(req, res) {
    const user = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    
    const foodItems = await foodmodel.find({}).skip(skip).limit(limit);
    
    const userSavedFoods = await saveModel.find({ user: user._id }).select('food');
    const savedFoodIds = userSavedFoods.map(save => save.food.toString());
    
    const userLikedFoods = await likeModel.find({ user: user._id }).select('food');
    const likedFoodIds = userLikedFoods.map(like => like.food.toString());
    
    const foodItemsWithStatus = foodItems.map(food => ({
        ...food.toObject(),
        isSaved: savedFoodIds.includes(food._id.toString()),
        isLiked: likedFoodIds.includes(food._id.toString())
    }));

    res.status(200).json({
        message: "Food Item Fetched successfully",
        food: foodItemsWithStatus,
        hasMore: foodItems.length === limit
    });
};

async function likeFood(req, res) {
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    });

    if(isAlreadyLiked) {
        await likeModel.findOneAndDelete({
            user: user._id,
            food: foodId
        });

        await foodmodel.findByIdAndUpdate(foodId, {
            $inc: {
                likeCount: -1
            }
        });

        return res.status(200).json({
            message: "Food Already Liked"
        });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });

    await foodmodel.findByIdAndUpdate(foodId, {
        $inc: {
            likeCount: 1
        }
    });

    res.status(201).json({
        message: "Food Liked Successfully",
        like: like
    });
};

async function saveFood(req, res) {
    const {foodId} = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });

    if(isAlreadySaved) {
        await saveModel.findOneAndDelete({
            user: user._id,
            food: foodId
        });

        const updatedFood = await foodmodel.findByIdAndUpdate(foodId, {
            $inc: {
                saveCount: -1
            }
        }, { new: true });

        return res.status(200).json({
            message: "Food Unsaved Successfully",
            save: false,
            savesCount: updatedFood.saveCount
        });
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });

    const updatedFood = await foodmodel.findByIdAndUpdate(foodId, {
        $inc: {
            saveCount: 1
        }
    }, { new: true });

    res.status(201).json({
        message: "Food Saved Successfully",
        save: true,
        savesCount: updatedFood.saveCount
    });
};

async function getSavedFood(req, res) {
    const user = req.user;

    const savedFood = await saveModel.find({
        user: user._id
    }).populate("food");

    if(!savedFood || saveFood.length === 0) {
        return res.status(404).json({
            message: "No Saved Food Found"
        });
    }

    res.status(200).json({
        message: "Saved Food Fetched Successfully",
        savedFood: savedFood
    });
};

async function getFoodItemById(req, res) {
    const {id} = req.params;
    const foodItem = await foodmodel.findById(id);

    if(!foodItem) {
        return res.status(404).json({
            message: "Food Item Not Found"
        });
    }

    res.status(200).json({
        message: "Food Item Fetched Successfully",
        foodItem: foodItem
    });
};

module.exports = { createFood, getFoodItems, likeFood, saveFood, getSavedFood, getFoodItemById };