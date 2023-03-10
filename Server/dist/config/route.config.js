"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passportJwt = _interopRequireDefault(require("passport-jwt"));
var _user = require("../database/user");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// 'Password-jwt' is the package required to work with 'Private' access method 

// 'Strategy' module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.
const JWTStrategy = _passportJwt.default.Strategy;
const ExtractJWT = _passportJwt.default.ExtractJwt;

// Here we will be using 'Bearer' Authentication method passing some Token
// Autherization - "Bearer someTokenString"
const options = {
  // 'jwtFromRequest' (REQUIRED) Function that accepts a request as the only parameter and returns either the JWT as a string or null.
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  // 'secretOrKey' is a string or buffer containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature.
  secretOrKey: "ZomatoApp"
};

// We will be using 'passport' for Authentication Purpose
var _default = passport => {
  passport.use(
  // Once the Task has been completed, we get a 'Payload'
  // Here 'done()' function refers to the next component/Section we will be navigated to, once the task is completed
  new JWTStrategy(options, async (jwt__payload, done) => {
    try {
      const doesUserExist = await _user.UserModel.findById(jwt__payload.user);

      // Here 'false' signifies that we don't want to show anything i.e. ('Secret Key')
      // 'done()' accepts arguments in the format function done(err, secret)
      if (!doesUserExist) return done(null, false);
      return done(null, doesUserExist);
    } catch (error) {
      throw new Error(error);
    }
  }));
};
exports.default = _default;