"use strict";

var _express = _interopRequireDefault(require("express"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _multer = _interopRequireDefault(require("multer"));
var _image = require("../../database/image");
var _s = require("../../utils/s3");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Router = _express.default.Router();
Router.use(_express.default.json());
const upload = (0, _multer.default)();

// Route       : "/:_id"
// Method      : GET
// Description : Get All images based on their id
// Access      : Public
// Parameters  : id
Router.get('/:_id', async (req, res) => {
  try {
    const {
      _id
    } = req.params;
    await validateId(req.params);
    const image = await _image.ImageModel.findById(_id);
    if (!image) {
      return res.status(404).json({
        error: `No Image available`
      });
    }
    return res.status(200).json({
      image
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Route       : "/"
// Method      : POST
// Description : Upload the image
// Access      : Public
// Parameters  : none
Router.post('/', upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const bucketOption = {
      // Following is the name of bucket we have created
      Bucket: "zomato-clone",
      // Name of the file on the user’s computer which act as the unique name/key for each file
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "Public-read"
    };
    const uploadImage = await (0, _s.s3Upload)(bucketOption);
    // Uploading images to the DB
    const dbUpload = await _image.ImageModel.create({
      image: [{
        Location: uploadImage.Location
      }]
    });
    return res.status(200).json({
      dbUpload
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
module.exports = Router;