"use strict";

var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _allModels = require("../../database/allModels");
var _image = require("../../database/image");
var _common = require("../../validation/common.validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.use(_express.default.json());

// Route       : "/list/:_id"
// Method      : GET
// Description : Get details of All Menus through specific restaurant id
// Access      : Public
// Parameters  : id
Router.get('/list/:_id', async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const menus = await _allModels.MenuModel.findById(_id);
    if (!menus) {
      return res.status(404).json({
        error: `No menu present for this restaurant`
      });
    }
    return res.status(200).json({
      menus
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Route       : "/images/:_id"
// Method      : GET
// Description : Get All images of the menus with their restaurant's id
// Access      : Public
// Parameters  : none
Router.get('/images/:_id', async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await (0, _common.validateId)(req.params);
    const menuImages = await _image.ImageModel.findById(_id);
    if (!menuImages) {
      return res.status(404).json({
        error: `No Menu Image available`
      });
    }
    return res.status(200).json({
      menuImages
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
module.exports = Router;