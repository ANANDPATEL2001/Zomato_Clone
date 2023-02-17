"use strict";

var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _allModels = require("../../database/allModels");
var _auth = require("../../validation/auth.validation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.use(_express.default.json());
Router.post('/signup', async (req, res) => {
  try {
    // Here we are calling 'validateSignup' function for data validation using 'joi'
    await (0, _auth.validateSignup)(req.body.credentials);
    await _allModels.UserModel.findByEmailAndPhone(req.body.credentials);

    // Creating New User for each signup process
    const newUser = await _allModels.UserModel.create(req.body.credentials);
    const token = newUser.generatejwtToken();
    return res.status(200).json({
      token,
      status: 'success'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});
Router.post('/signin', async (req, res) => {
  try {
    await (0, _auth.validateSignin)(req.body.credentials);
    const user = await _allModels.UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generatejwtToken();
    return res.status(200).json({
      token,
      status: 'success'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

// Google Authentication
Router.get('/google', _passport.default.authenticate('google', {
  scope: ["https://www.googleapis.com/auth/userinfo/profile", "https://www.googleapis.com/auth/userinfo/email"]
}));
Router.get('/google/callback', _passport.default.authenticate('google', {
  failureRedirect: '/'
}), (req, res) => {
  return res.status(200).json({
    token: req.session.passport.user.token
  });
});
module.exports = Router;