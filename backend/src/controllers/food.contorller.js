const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid} = require('uuid'); // to generate unique file names for uploaded files.
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');


async function createFood(req,res) {

    const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        videoUrl: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "food item created successfully",
        food: foodItem
    })

}

async function getFoodItems(req,res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

async function likeFood(req,res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        food: foodId,
        user: user._id
    })

    if(isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: {
                likeCount: -1
            }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })   // creating a new like document in the database to represent that the user has liked the food item.

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: {
            likeCount: 1
        }
    })

    res.status(200).json({
        message: "Food liked successfully",
        like
    })
   
}

async function saveFood(req,res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        food: foodId,
        user: user._id
    })

    if(isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: {
                saveCount: -1
            }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: {
            saveCount: 1
        }
    })

    res.status(200).json({
        message: "Food saved successfully",
        save
    })
}

async function getSavedFoodItems(req,res) {
    const user = req.user;

    const savedFoodItems = await saveModel.find({ user: user._id }).populate('food');

    if(!savedFoodItems || savedFoodItems.length === 0) {
        return res.status(404).json({
            message: "No saved food items found for the user"
        });
    }

    res.status(200).json({
        message: "Saved food items fetched successfully",
        savedFoodItems
    });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoodItems
}