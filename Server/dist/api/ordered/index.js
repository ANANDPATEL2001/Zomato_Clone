"use strict";

var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _allModels = require("../../database/allModels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.use(_express.default.json());

// Route       : "/"
// Method      : GET
// Description : Get details of orders through user's id
// Access      : Private
// Parameters  : none
Router.get('/', _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const getOrders = await _allModels.OrderModel.findOne({
      user: user._id
    });
    if (!getOrders) {
      return res.status(404).json({
        error: `No Orders found for this user`
      });
    }
    return res.status(200).json({
      order: getOrders
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Route       : "/new"
// Method      : PUT
// Description : Add new order through user's id
// Access      : Private
// Parameters  : none
Router.put('/new', _passport.default.authenticate("jwt", {
  session: false
}), async (req, res) => {
  try {
    const {
      user
    } = req;
    const {
      orderDetails
    } = req.body;
    if (!orderDetails) {
      return res.status(404).json({
        error: `No Order details provided !!`
      });
    }
    const addNewOrder = await _allModels.OrderModel.findOneAndUpdate({
      user: user._id
    }, {
      $push: {
        orderDetails: orderDetails
      }
    }, {
      new: true
    });
    return res.status(200).json({
      newOrder: addNewOrder
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
module.exports = Router;