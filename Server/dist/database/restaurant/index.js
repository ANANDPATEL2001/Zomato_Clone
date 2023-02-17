"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestaurantModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RestaurantSchema = new _mongoose.default.Schema({
  // As ordered can hold multiple (values/items) hence declared as an array
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  mapLocation: {
    type: String,
    required: true
  },
  // If we have only one attribute to specify we can use shorthand property like below
  cuisine: String,
  RestaurantTimings: String,
  contactNumber: Number,
  website: String,
  popularDishes: String,
  averageCost: Number,
  amenities: String,
  menuImages: {
    type: _mongoose.default.Types.ObjectId,
    ref: "images"
  },
  menu: {
    type: _mongoose.default.Types.ObjectId,
    ref: "menus"
  },
  // There will be multiple reviews (i.e. regarding Dishes and Restaurants)
  reviews: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "reviews"
  }],
  photos: {
    type: _mongoose.default.Types.ObjectId,
    ref: "images"
  }
}, {
  timestamps: true
});

// Collection alwayse works with plural hence following contains 'Restaurants' instead of 'Restaurant' 
const RestaurantModel = _mongoose.default.model("Restaurants", RestaurantSchema);
exports.RestaurantModel = RestaurantModel;