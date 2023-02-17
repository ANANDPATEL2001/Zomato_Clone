import express from "express";

import { RestaurantModel } from "../../database/allModels";
import { validateId, validateSearchString } from "../../validation/common.validation";

const Router = express.Router();
Router.use(express.json());

// Route       : "/"
// Method      : GET
// Description : Get All the Restaurants besed upon provided city
// Access      : Public
// Parameters  : none
Router.get('/', async (req, res) => {
    try {
        const { city } = req.query;
        // The Below syntax is based upon the Query Parameter like : http://locahost:8081/restaurant/?city=delhi
        const restaurants = await RestaurantModel.find({ city });

        if (restaurants.length === 0) {
            return res.status(404).json({ error: `No Restaurant Found in ${city} city` });
        }
        return res.status(200).json({ restaurants });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/:id"
// Method      : GET
// Description : Get individual Restaurant besed upon given id
// Access      : Public
// Parameters  : _id
Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await validateId(req.params);
        const restaurant = await RestaurantModel.findById(_id);

        if (!restaurant) {
            return res.status(404).json({ error: `Restaurant not Found` });
        }
        return res.status(200).json({ restaurant });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/search/:searchString"
// Method      : GET
// Description : Get Restaurant based upon given searchString
// Access      : Public
// Parameters  : searchString
Router.get('/search/:searchString', async (req, res) => {
    try {
        const { searchString } = req.params;
        await validateSearchString(req.params);

        const restaurants = await RestaurantModel.find({
            // Here $regex and $option is the feature provided by the 'MongoDB' 
            // $regex is used for the implementing Regular-Expression and "i" indicates Case Insensitivity 
            // Case Insensitivity Ex. /udapi Hotel, /Udapi Hotel 
            category: { $regex: searchString, $option: "i" },
        });
        if (restaurants.length === 0) {
            return res.status(404).json({ error: `No Restaurant matches with ${searchString}` });
        }
        return res.status(200).json({ restaurants });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = Router;