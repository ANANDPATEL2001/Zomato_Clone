"use strict";

var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _allModels = require("../../database/allModels");
var _common = require("../../validation/common.validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const Router = _express.default.Router();
Router.use(_express.default.json());

// Route       : "/resId"
// Method      : GET
// Description : Get all reviews of a perticular restaurant through it's id
// Access      : Public
// Parameters  : resId
Router.get('/resId', async (req, res) => {
  try {
    const {
      resId
    } = req.params;
    await (0, _common.validateId)(req.params);
    const reviews = await _allModels.ReviewModel.findOne({
      restaurant: resId
    }).sort({
      // Below -1 indicates Descending order by Date-of-creation
      // Similarly 1 indicates Ascending order by Date-of-creation
      createdAt: -1
    });
    if (!reviews) {
      return res.status(404).json({
        error: `No Review found for specified Restaurant`
      });
    }
    return res.status(200).json({
      reviews: reviews
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Route       : "/new"
// Method      : POST
// Description : Add new food/restaurrant review and ratings
// Access      : Private
// Parameters  : none
Router.put('/new', _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.user;
    const {
      reviewData
    } = req.body;
    if (!reviewData) {
      return res.status(404).json({
        error: `No review details provided !!`
      });
    }
    const newReview = await _allModels.ReviewModel.create(_objectSpread(_objectSpread({}, reviewData), {}, {
      user: _id
    }));
    return res.status(200).json({
      newReview: newReview
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Route       : "/delete/_id"
// Method      : DELETE
// Description : Delete food/restaurrant review and ratings
// Access      : Private
// Parameters  : id
Router.delete('/delete/:id', _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    const {
      user
    } = req;
    await (0, _common.validateId)(req.params);
    const reviewData = await _allModels.ReviewModel.findOneAndDelete({
      // Here we have provided two ids, One w.r.t. id of the review and Second w.r.t. user id
      _id: _id,
      user: user._id
    });
    if (!reviewData) {
      return res.status(404).json({
        message: `No review found to be deleted`
      });
    }
    return res.status(200).json({
      message: `Successfully deleted the review`,
      reviewData
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
module.exports = Router;