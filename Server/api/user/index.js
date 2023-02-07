import express from "express";
import session from 'express-session';
import passport from 'passport';

import { UserModel } from "../../database/allModels";

const Router = express.Router();
Router.use(express.json());

// Route       : "/"
// Method      : GET
// Description : Get details of All authentic Users
// Access      : Private
// Parameters  : none
Router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { email, fullName, phoneNumber, address } = req.user;
        return res.status(200).json({ user: { email, fullName, phoneNumber, address } });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/:_id"
// Method      : GET
// Description : Get details of individual authentic User
// Access      : Public
// Parameters  : id
Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);

        if (!getUser) {
            return res.status(404).json({ error: `No User found with ${_id} id` });
        }

        const { fullName } = getUser;
        return res.status(200).json({ user: fullName });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/updata/:_id"
// Method      : PUT
// Description : Update details of a specific Users through their id
// Access      : Private
// Parameters  : id
Router.put('/update/:_id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.params;
        const { userData } = req.body;

        // Below is used to prevent anonymous entity to update user Data simply through their id
        userData.password = undefined;

        const updateUserData = await UserModel.findById(
            _id,
            { $set: userData, },
            { new: true, }
        );

        if (!updateUserData) {
            return res.status(404).json({ error: `No User found with ${_id} id` });
        }
        return res.status(200).json({ user: updateUserData });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = Router;