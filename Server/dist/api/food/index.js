"use strict";

var _express = _interopRequireDefault(require("express"));
var _allModels = require("../../database/allModels");
var _common = require("../../validation/common.validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.use(_express.default.json());

// Route       : "/:_id"
// Method      : GET
// Description : Get food based upon _id provided
// Access      : Public
// Parameters  : _id
Router.get('/:_id', async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const foods = await _allModels.FoodModel.findById(_id);
    return res.status(200).json({
      foods
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Route       : "/r/:_id"
// Method      : GET
// Description : Get food based upon perticular restaurant 
// Access      : Public
// Parameters  : _id
Router.get('/r/:_id', async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const foods = await _allModels.FoodModel.findById({
      restaurant: _id
    });
    return res.status(200).json({
      foods
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Route       : "/c/category"
// Method      : GET
// Description : Get food based upon perticular category
// Access      : Public
// Parameters  : category
Router.get('/c/category', async (req, res) => {
  try {
    const {
      category
    } = req.params;
    await (0, _common.validateCategory)(req.params);
    const foods = await _allModels.FoodModel.find({
      // Here $regex and $option is the feature provided by the 'MongoDB' 
      // $regex is used for the implementing Regular-Expression and "i" indicates Case Insensitivity 
      // Case Insensitivity Ex. /non-veg, /non-Veg 
      category: {
        $regex: category,
        $option: "i"
      }
    });
    if (!foods) {
      return res.status(404).json({
        error: `No food item matches with ${category} category`
      });
    }
    return res.status(200).json({
      foods
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
module.exports = Router;