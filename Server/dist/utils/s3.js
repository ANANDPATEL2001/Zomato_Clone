"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.s3Upload = void 0;
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const s3Bucket = new _awsSdk.default.S3({
  accessKeyID: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  // Following region refers to the region of server location
  region: "ap-south-1"
});
const s3Upload = options => {
  // Here we have used Promise instead of 'try-catch' function as in case of 'try-catch' we might get error or warning message (most of the time)
  return new Promise((resolve, reject) => {
    s3Bucket.upload(options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
};
exports.s3Upload = s3Upload;