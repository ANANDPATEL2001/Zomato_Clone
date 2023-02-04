"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connection = _interopRequireDefault(require("./database/connection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Database Connection

const PORT = 8081;
_dotenv.default.config();
const zomato = (0, _express.default)();
zomato.use(_express.default.json());
zomato.get("/", (req, res) => {
  res.json({
    message: "Your server is running.."
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