import express from "express";

import { UserModel } from "../../database/user";

const Router = express.Router();
Router.use(express.json());

Router.post('/signup', async (req, res) => {
    try {
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
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        const token = user.generatejwtToken();
        return res.status(200).json({ token, status: 'success' });
    }
    catch (error) {
        return res.status(500).json({error: error.message });
    }
});


module.exports = Router;