"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MenuSchema = new _mongoose.default.Schema({
  // As menus can hold multiple (values/items) hence declared as an array
  menus: [{
    name: {
      type: String,
      required: true
    },
    items: [{
      type: {
        type: _mongoose.default.Types.ObjectId,
        ref: "foods"
      }
    }]
  }],
  recommended: [{
    type: _mongoose.default.Types.ObjectId,
    ref: "foods",
    unique: true
  }]
}, {
  timestamps: true
});

// Collection alwayse works with plural hence following contains 'menus' instead of 'menu' 
const MenuModel = _mongoose.default.model("menus", MenuSchema);
exports.MenuModel = MenuModel;