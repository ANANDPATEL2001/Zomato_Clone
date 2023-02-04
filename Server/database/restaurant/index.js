import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        // As ordered can hold multiple (values/items) hence declared as an array
        name: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        mapLocation: { type: String, required: true },

        // If we have only one attribute to specify we can use shorthand property like below
        cuisine: String,
        RestaurantTimings: String,
        contactNumber: Number,
        website: String,
        popularDishes: String,
        averageCost: Number,
        amenities: String,
        menuImages: {
            type: mongoose.Types.ObjectId,
            ref: "images",
        },
        menu: {
            type: mongoose.Types.ObjectId,
            ref: "menus",
        },
        
        // There will be multiple reviews (i.e. regarding Dishes and Restaurants)
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "reviews",
            },
        ],
        photos: {
            type: mongoose.Types.ObjectId,
            ref: "images",
        },
    },
    {
        timestamps: true,
    }
);

// Collection alwayse works with plural hence folowing contains 'Restaurants' instead of 'Restaurant' 
export const RestaurantModel = mongoose.model("Restaurants", RestaurantSchema);