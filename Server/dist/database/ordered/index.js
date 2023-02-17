"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OrderSchema = new _mongoose.default.Schema({
  // As Orders can hold multiple (values/items) hence declared as an array
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: "users"
  },
  orderDetails: [{
    foods: [{
      details: {
        type: _mongoose.default.Types.ObjectId,
        ref: "foods"
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    payMode: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    paymentDetails: {
      itemTotal: {
        type: Number,
        required: true
      },
      promo: {
        type: Number,
        required: true
      },
      tax: {
        type: Number,
        required: true
      },
      razorpay_payment_id: {
        type: String,
        required: true
      }
    }
  }]
}, {
  timestamps: true
});

// Collection alwayse works with plural hence following contains 'orders' instead of 'order' 
const OrderModel = _mongoose.default.model("orders", OrderSchema);
exports.OrderModel = OrderModel;