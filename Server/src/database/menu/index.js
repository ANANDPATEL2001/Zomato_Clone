import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
    {
        // As menus can hold multiple (values/items) hence declared as an array
        menus: [
            {
                name: { type: String, required: true },
                items: [
                    {
                        type: {
                            type: mongoose.Types.ObjectId,
                            ref: "foods"
                        },
                    }

                ]
            },
        ],
        recommended : [
            {
                type : mongoose.Types.ObjectId,
                ref : "foods",
                unique : true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Collection alwayse works with plural hence following contains 'menus' instead of 'menu' 
export const MenuModel = mongoose.model("menus", MenuSchema);