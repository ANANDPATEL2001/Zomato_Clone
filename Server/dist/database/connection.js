"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = async () => {
  return _mongoose.default.connect(process.env.MONGO_URL, {
    // In case of any deprecation warning, we use followings (which are optional)
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
exports.default = _default;