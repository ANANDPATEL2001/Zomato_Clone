"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSignup = exports.validateSignin = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validateSignup = userData => {
  const Schema = _joi.default.object({
    fullName: _joi.default.string().required().max(50).min(5),
    email: _joi.default.string().required().email(),
    // Below [3,30] refers to the min and max significant values of the password 
    password: _joi.default.string().pattern(new RegExp('^[a-zA-Z0-9][3,30]$')),
    address: _joi.default.array().items(_joi.default.object({
      detail: _joi.default.string(),
      for: _joi.default.string()
    })),
    phoneNumber: _joi.default.array().items(_joi.default.Number()).max(10).min(10)
  });
  // Below 'validateAsync' alwayse returns a 'Promise' function rather than an 'Object'
  // Also if we work with Synchronous method it will take much time
  return Schema.validateAsync(userData);
};
exports.validateSignup = validateSignup;
const validateSignin = userData => {
  const Schema = _joi.default.object({
    email: _joi.default.string().required().email(),
    // Below [3,30] refers to the min and max significant values of the password 
    password: _joi.default.string().pattern(new RegExp('^[a-zA-Z0-9][3,30]$'))
  });
  return Schema.validateAsync(userData);
};
exports.validateSignin = validateSignin;