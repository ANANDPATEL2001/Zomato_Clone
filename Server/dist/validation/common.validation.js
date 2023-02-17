"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSearchString = exports.validateId = exports.validateCategory = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const validateId = id => {
  const Schema = _joi.default.object({
    _id: _joi.default.string().required()
  });
  // Below 'validateAsync' alwayse returns a 'Promise' function rather than an 'Object'
  // Also if we work with Synchronous method it will take much time
  return Schema.validateAsync(id);
};
exports.validateId = validateId;
const validateCategory = category => {
  const Schema = _joi.default.object({
    category: _joi.default.string().required()
  });
  return Schema.validateAsync(category);
};
exports.validateCategory = validateCategory;
const validateSearchString = SearchString => {
  const Schema = _joi.default.object({
    SearchString: _joi.default.string().required()
  });
  return Schema.validateAsync(SearchString);
};
exports.validateSearchString = validateSearchString;