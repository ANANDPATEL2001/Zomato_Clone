import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        descript: { type: String, required: true },
        isVeg: { type: Boolean, required: true },
        isContainsEggs: { type: Boolean, required: true },
        category: { type: String, required: true },
        photos: {
            type: mongoose.Types.ObjectId,
            ref: "images",
            required : true
        },
        price: { type: Number, required: true },

        // addOns are for the user Recommendation regarding dishes
        addOns: {
            type: mongoose.Types.ObjectId,
            ref: "foods",
        },
        resturant: {
            type: mongoose.Types.ObjectId,
            ref: "resturants",
            required : true
        },
    },
    {
        timestamps: true,
    }
);

// Collection alwayse works with plural hence following contains 'foods' instead of 'food' 
export const FoodModel = mongoose.model("foods", FoodSchema);