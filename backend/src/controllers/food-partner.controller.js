const foodPartnerModel = require("../models/foodPartner.model");
const foodModel = require("../models/food.model");

async function getAllFoodPartner(req, res) {
    const foodPartners = await foodPartnerModel.find();

    if(!foodPartners) {
        return res.status(404).json({message: "Food Partners not found"});
    }

    return res.status(200).json({message: "Food Partners retrive successfully", foodPartners: foodPartners});
}

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId })

    if(!foodPartner) {
        return res.status(404).json({message: "Food Partner not found"});
    }

    res.status(200).json({message: "Food partner retrive successfully", foodPartner: {...foodPartner.toObject(), foodItems: foodItemsByFoodPartner}});
}

module.exports = { getFoodPartnerById, getAllFoodPartner };