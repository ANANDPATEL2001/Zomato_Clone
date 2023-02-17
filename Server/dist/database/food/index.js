"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoodModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FoodSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  descript: {
    type: String,
    required: true
  },
  isVeg: {
    type: Boolean,
    required: true
  },
  isContainsEggs: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  photos: {
    type: _mongoose.default.Types.ObjectId,
    ref: "images",
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // addOns are for the user Recommendation regarding dishes
  addOns: {
    type: _mongoose.default.Types.ObjectId,
    ref: "foods"
  },
  resturant: {
    type: _mongoose.default.Types.ObjectId,
    ref: "resturants",
    required: true
  }
}, {
  timestamps: true
});

// Collection alwayse works with plural hence following contains 'foods' instead of 'food' 
const FoodModel = _mongoose.default.model("foods", FoodSchema);
exports.FoodModel = FoodModel;