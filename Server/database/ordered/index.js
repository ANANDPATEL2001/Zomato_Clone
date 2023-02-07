import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        // As Orders can hold multiple (values/items) hence declared as an array
        user: {
            type: mongoose.Types.ObjectId,
            ref: "users",
        },
        orderDetails: [
            {
                foods: [
                    {
                        details: { type: mongoose.Types.ObjectId, ref: "foods" },
                        quantity: { type: Number, required: true },
                    },
                ],
                payMode: { type: String, required: true },
                status: { type: String, required: true },
                paymentDetails: {
                    itemTotal: { type: Number, required: true },
                    promo: { type: Number, required: true },
                    tax: { type: Number, required: true },
                    razorpay_payment_id: { type: String, required: true },
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Collection alwayse works with plural hence following contains 'orders' instead of 'order' 
export const OrderModel = mongoose.model("orders", OrderSchema);