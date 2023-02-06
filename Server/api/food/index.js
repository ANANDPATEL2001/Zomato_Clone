import express from "express";

import { FoodModel } from "../../database/allModels";

const Router = express.Router();
Router.use(express.json());

// Route       : "/:_id"
// Method      : GET
// Description : Get food based upon _id provided
// Access      : Public
// Parameters  : _id
Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.findById(_id);
        return res.status(200).json({ foods });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/r/:_id"
// Method      : GET
// Description : Get food based upon perticular restaurant 
// Access      : Public
// Parameters  : _id
Router.get('/r/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.findById({
            restaurant: _id
        });
        return res.status(200).json({ foods });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/c/category"
// Method      : GET
// Description : Get food based upon perticular category
// Access      : Public
// Parameters  : category
Router.get('/c/category', async (req, res) => {
    try {
        const { category } = req.params;
        const foods = await FoodModel.find({
            // Here $regex and $option is the feature provided by the 'MongoDB' 
            // $regex is used for the implementing Regular-Expression and "i" indicates Case Insensitivity 
            // Case Insensitivity Ex. /non-veg, /non-Veg 
            category: { $regex: category, $option: "i" },
        });
        if (!foods) {
            return res.status(404).json({ error: `No food item matches with ${category} category` });
        }
        return res.status(200).json({ foods });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = Router;