import express from "express";
import dotenv from "dotenv";

// Database Connection
import ConnectDB from "./database/connection";

// User Authentication i.e.(signin & sinup)
import Auth from './api/auth';

const PORT = 8081;
dotenv.config();

const zomato = express();
zomato.use(express.json());


zomato.get("/", (req, res) => {
    res.status(200).json({
        message: "Your server is running..",
    });
});

zomato.use("/auth", Auth);

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