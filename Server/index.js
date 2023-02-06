import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from 'express-session';

// For Private Authentication Methods
import PrivateRouteConfig from './config/route.config';

// Database Connection
import ConnectDB from "./database/connection";

// API
import Auth from './api/auth';
import Food from './api/food';
import Restaurant from './api/restaurant';
import User from './api/user';

const PORT = 8081;
dotenv.config();

const zomato = express();
zomato.use(express.json());

PrivateRouteConfig(passport);
zomato.use(passport.initialize());
zomato.use(session({ secret: "ZomatoApp" }));
zomato.use(passport.session());

zomato.use('/auth', Auth);
zomato.use('/food', Food);
zomato.use('/restaurant', Restaurant);
zomato.use('/user', passport.authenticate("jwt", { session: false }), User);


zomato.get("/", (req, res) => {
    res.status(200).json({
        message: "Your server is running..",
    });
});

zomato.get("*", (req, res) => {
    res.status(200).json({
        message: `Provided Route not available !!`,
    });
});


zomato.listen(PORT, () => {
    // following .then & .catch is alternate to the 'async' - 'await' commands
    ConnectDB()
        .then(() => {
            console.log(`DB connection established`);
            console.log(`Server is running at Port ${PORT}`);
        })
        .catch((error) => {
            console.log(`Server started running but DB connection failed !!`);
            console.log(error);
        })
});