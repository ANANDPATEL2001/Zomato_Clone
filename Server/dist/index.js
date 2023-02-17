"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _route = _interopRequireDefault(require("./config/route.config"));
var _google = _interopRequireDefault(require("./config/google.config"));
var _connection = _interopRequireDefault(require("./database/connection"));
var _auth = _interopRequireDefault(require("./api/auth"));
var _food = _interopRequireDefault(require("./api/food"));
var _restaurant = _interopRequireDefault(require("./api/restaurant"));
var _user = _interopRequireDefault(require("./api/user"));
var _menu = _interopRequireDefault(require("./api/menu"));
var _ordered = _interopRequireDefault(require("./api/ordered"));
var _review = _interopRequireDefault(require("./api/review"));
var _image = _interopRequireDefault(require("./api/image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// For Private Authentication Methods

// For Google Authentication Methods

// Database Connection

// API

const PORT = 8081;
_dotenv.default.config();
(0, _route.default)(_passport.default);
(0, _google.default)(_passport.default);
const zomato = (0, _express.default)();
zomato.use(_express.default.json());
zomato.use(_passport.default.initialize());
zomato.use((0, _expressSession.default)({
  secret: "ZomatoApp"
}));
zomato.use(_passport.default.session());
zomato.use('/auth', _auth.default);
zomato.use('/food', _food.default);
zomato.use('/restaurant', _restaurant.default);
zomato.use('/user', _user.default);
zomato.use('/menu', _menu.default);
zomato.use('/order', _ordered.default);
zomato.use('/review', _review.default);
zomato.use('/image', _image.default);
zomato.get("/", (req, res) => {
  res.status(200).json({
    message: "Your server is running.."
  });
});
zomato.get("*", (req, res) => {
  res.status(200).json({
    message: `Provided Route not available !!`
  });
});
zomato.listen(PORT, () => {
  // following .then & .catch is alternate to the 'async' - 'await' commands
  (0, _connection.default)().then(() => {
    console.log(`DB connection established`);
    console.log(`Server is running at Port ${PORT}`);
  }).catch(error => {
    console.log(`Server started running but DB connection failed !!`);
    console.log(error);
  });
});