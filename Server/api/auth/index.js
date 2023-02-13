import express from "express";

import { UserModel } from "../../database/allModels";
import { validateSignup } from "../../validation/auth.validation";
import { validateSignin } from "../../validation/auth.validation";

const Router = express.Router();
Router.use(express.json());

Router.post('/signup', async (req, res) => {
    try {
        // Here we are calling 'validateSignup' function for data validation using 'joi'
        await validateSignup(req.body.credentials);
        await UserModel.findByEmailAndPhone(req.body.credentials);

        // Creating New User for each signup process
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generatejwtToken();
        return res.status(200).json({ token, status: 'success' });
    }
    catch (error) {
        return res.status(500).json({error: error.message });
    }
});

Router.post('/signin', async (req, res) => {
    try {
        await validateSignin(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        const token = user.generatejwtToken();
        return res.status(200).json({ token, status: 'success' });
    }
    catch (error) {
        return res.status(500).json({error: error.message });
    }
});


module.exports = Router;