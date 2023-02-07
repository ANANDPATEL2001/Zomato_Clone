import express from "express";
import session from 'express-session';
import passport from 'passport';

import { ReviewModel } from "../../database/allModels";

const Router = express.Router();
Router.use(express.json());

// Route       : "/resId"
// Method      : GET
// Description : Get all reviews of a perticular restaurant through it's id
// Access      : Public
// Parameters  : resId
Router.get('/resId', async (req, res) => {
    try {
        const { resId } = req.params;
        const reviews = await ReviewModel.findOne({ restaurant: resId }).sort({
            // Below -1 indicates Descending order by Date-of-creation
            // Similarly 1 indicates Ascending order by Date-of-creation
            createdAt: -1,
        });

        if (!reviews) {
            return res.status(404).json({ error: `No Review found for specified Restaurant` });
        }

        return res.status(200).json({ reviews: reviews });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/new"
// Method      : POST
// Description : Add new food/restaurrant review and ratings
// Access      : Private
// Parameters  : none
Router.put('/new', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.user;
        const { reviewData } = req.body;

        if (!reviewData) {
            return res.status(404).json({ error: `No review details provided !!` });
        }

        const newReview = await ReviewModel.create({ ...reviewData, user: _id })
        return res.status(200).json({ newReview: newReview });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route       : "/delete/_id"
// Method      : DELETE
// Description : Delete food/restaurrant review and ratings
// Access      : Private
// Parameters  : id
Router.delete('/delete/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { _id } = req.params;
        const { user } = req;

        const reviewData = await ReviewModel.findOneAndDelete({
            // Here we have provided two ids, One w.r.t. id of the review and Second w.r.t. user id
            _id: _id,
            user: user._id,
        });

        if (!reviewData) {
            return res.status(404).json({ message: `No review found to be deleted` })
        }
        return res.status(200).json({ message: `Successfully deleted the review`, reviewData });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = Router;