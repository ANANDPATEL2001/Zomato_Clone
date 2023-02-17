import express from "express";
import session from 'express-session';
import passport from 'passport';

import { OrderModel } from "../../database/allModels";

const Router = express.Router();
Router.use(express.json());

// Route       : "/"
// Method      : GET
// Description : Get details of orders through user's id
// Access      : Private
// Parameters  : none
Router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user } = req;
        const getOrders = await OrderModel.findOne({ user: user._id });

        if (!getOrders) {
            return res.status(404).json({ error: `No Orders found for this user` });
        }

        return res.status(200).json({ order: getOrders });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/new"
// Method      : PUT
// Description : Add new order through user's id
// Access      : Private
// Parameters  : none
Router.put('/new', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { user } = req;
        const { orderDetails } = req.body;

        if (!orderDetails) {
            return res.status(404).json({ error: `No Order details provided !!` });
        }

        const addNewOrder = await OrderModel.findOneAndUpdate(
            { user: user._id },
            {
                $push:
                {
                    orderDetails: orderDetails,
                },
            },
            {
                new: true,
            }
        )
        return res.status(200).json({ newOrder: addNewOrder });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = Router;