"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  // password is optional as Application may get the details from google
  password: {
    type: String,
    required: false
  },
  // address may be multiple as address of the 'owner' and that for other 'person'
  address: [{
    detail: {
      type: String
    },
    //Details of the user
    for: {
      type: String
    } //Address details
  }],

  phoneNumber: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Used for 'attachment' for use of any function
// All the required functionn may be invoked through 'UserSchema.methods'
// jwtToken - (json web token) used to remember user Credentials & login and redirect user to Home_Page automatically when the user opens the Application next time = > ie. Session Based Application
UserSchema.methods.generatejwtToken = function () {
  // Below 'this._id' is instance of UserSchema & 'ZomatoApp' is the Secret key to identify and change 'jwt'
  return _jsonwebtoken.default.sign({
    user: this._id.toString()
  }, "ZomatoApp");
};

// Helper function for signUp
// Following function is used to find the details of users from the DB if it exist 
UserSchema.statics.findByEmailAndPhone = async (email, phoneNumber) => {
  const checkUserByEmail = await UserModel.findOne({
    email
  });
  const checkUserByPhone = await UserModel.findOne({
    phoneNumber
  });
  if (checkUserByEmail || checkUserByPhone) {
    throw new Error(`User Already exists !!`);
  }
  return false;
};

// Helper function for signIn
// Following function is used to authenticate user details through DB 
UserSchema.statics.findByEmailAndPassword = async (email, password) => {
  const user = await UserModel.findOne({
    email
  });
  if (!user) {
    throw new Error(`User doesn't exist !!`);
  }

  // Comparing the Passwords
  // We need to Decrypt the password before comparing, hence used bcrypt
  const doesPasswordMatch = await _bcryptjs.default.compare(password, user.password);
  if (!doesPasswordMatch) {
    throw new Error(`Invalid Credentials !!`);
  }
  return user;
};

// Following function 'pre' is used to perform some action/function before any Event ('save') i.e. before saving user credentials 
// In order to work with constructor of child component/function we have used 'next()' constructor. Similarly to work with parent constructor we will be using 'super()' constructor
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  // Now we will go for Hashing and Salting 
  // Hashing is used to protect password and 'Salting' refers to the of times 'Hashing' is performed
  // Hashing should be below 10 otherwise it would take long time to generate and comapre the hash value & password
  _bcryptjs.default.genSalt(8, (error, salt) => {
    // Random bytes get added to the password, and together the salted hash meets security recommendations on length and unpredictability.
    if (error) return next(error);

    // Hashing the password for 8 times
    _bcryptjs.default.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      return next();
    });
  });
});

// Collection alwayse works with plural hence following contains 'users' instead of 'user' 
const UserModel = _mongoose.default.model("users", UserSchema);
exports.UserModel = UserModel;