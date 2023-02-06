import express from "express";

import { UserModel } from "../../database/allModels";

const Router = express.Router();
Router.use(express.json());

// Route       : "/"
// Method      : GET
// Description : Get details of All authentic Users
// Access      : Public
// Parameters  : none
Router.get('/', async (req, res) => {
    try {
        const { email, fullName, phoneNumber, address } = req.user;
        return res.status(200).json({ user : {email, fullName, phoneNumber, address} });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = Router;