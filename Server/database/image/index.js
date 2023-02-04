import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        // As Images can hold multiple (values/items) hence declared as an array
        images: [
            {
                location: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Collection alwayse works with plural hence folowing contains 'images' instead of 'image' 
export const ImageModel = mongoose.model("images", ImageSchema);