import express from "express";
import session from 'express-session';
import passport from 'passport';

import { MenuModel } from "../../database/allModels";
import { ImageModel } from "../../database/image";

const Router = express.Router();
Router.use(express.json());


// Route       : "/list/:_id"
// Method      : GET
// Description : Get details of All Menus through specific restaurant id
// Access      : Public
// Parameters  : id
Router.get('/list/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const menus = await MenuModel.findById(_id);

        if (!menus) {
            return res.status(404).json({ error: `No menu present for this restaurant` });
        }

        return res.status(200).json({ menus });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/images/:_id"
// Method      : GET
// Description : Get All images of the menus with their restaurant's id
// Access      : Public
// Parameters  : none
Router.get('/images/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const menuImages = await ImageModel.findById(_id);

        if (!menuImages) {
            return res.status(404).json({ error: `No Menu Image available` });
        }

        return res.status(200).json({ menuImages });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = Router;