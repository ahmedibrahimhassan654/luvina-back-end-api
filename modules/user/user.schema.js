/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../../common/config/config');
const roles = require('./enum/roles');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [150, 'Name should be less than 150 characters']
    },
    userName: {
      type: String,
      index: true,
      unique: true,
      dropDups: true,
      required: [true, 'Please add a user name']
    },
    phoneNumber: {
      // required: [true, 'Please add a phone number'],
      type: String,
      index: true,
      unique: true,
      sparse: true,
      maxlength: [20, 'Phone number should be less than 20 characters']
      // match: [/^(\+2)?01([0-9]{9})$/, 'Please add a valid Phone number']
    },
    phoneVerification: {
      type: {
        token: { type: String },
        tokenExpiration: { type: Date },
        isVerified: { type: Boolean, default: false }
      }
    },
    email: {
      // required: [true, 'Please add an email'],
      type: String,
      index: true,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid Mail'
      ]
    },
    emailVerification: {
      type: {
        token: { type: String },
        tokenExpiration: { type: Date },
        isVerified: { type: Boolean, default: false }
      }
    },
    googleId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
      select: false
    },
    facebookId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
      select: false
    },
    linkedInId: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
      select: false
    },
    roles: {
      type: [String],
      required: true,
      enum: Object.values(roles),
      default: [roles.ROLE_CUSTOMER]
    },
    password: {
      // salted and hashed using bcrypt
      type: String,
      required: true,
      select: false
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    photo: { type: String, default: 'no-photo.jpg' }
  },
  {
    timestamps: true
  }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (this.isNew) {
    this.email = this.email.toLowerCase();
  }
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(+config.salt);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign jwt
UserSchema.methods.generateJWT = function() {
  // eslint-disable-next-line no-underscore-dangle
  return jwt.sign({ _id: this._id }, config.jwt.key, {
    algorithm: 'HS256',
    expiresIn: config.jwt.expire
  });
};

UserSchema.methods.toAuthJSON = function() {
  return {
    // eslint-disable-next-line no-underscore-dangle
    _id: this._id,
    roles: this.roles,
    token: `Bearer ${this.generateJWT()}`
  };
};

// Match user hashed password with entered password
UserSchema.methods.validatePassword = async function(enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

// https://stackoverflow.com/questions/51297015/has-mongoose-fixed-the-index-that-is-unique-and-sparse-and-can-take-null-values
// https://thecodebarbarian.com/enforcing-uniqueness-with-mongodb-partial-unique-indexes.html
