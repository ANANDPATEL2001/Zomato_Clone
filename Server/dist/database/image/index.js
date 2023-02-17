"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ImageSchema = new _mongoose.default.Schema({
  // As Images can hold multiple (values/items) hence declared as an array
  images: [{
    location: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Collection alwayse works with plural hence following contains 'images' instead of 'image' 
const ImageModel = _mongoose.default.model("images", ImageSchema);
exports.ImageModel = ImageModel;