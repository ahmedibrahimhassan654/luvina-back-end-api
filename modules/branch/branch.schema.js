const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BranchSchema = new mongoose.Schema({
  branchName: {
    type: String,
    // unique:true,
    required: [true, 'Please add a branch name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  branchManger: {
    type: String,
    // unique:true,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  branchAddress: {
    type: String,
    required: [true, 'Please add an branche address']
  },

  branchlocation: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  branchEmail: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  brancheTelephneNumber: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  }
});

BranchSchema.pre('save', function(next) {
  this.slug = slugify(this.branchName, { lower: true });
  next();
});

BranchSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.branchAddress);
  this.branchlocation = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  this.branchAddress = undefined;

  next();
}),
  (module.exports = mongoose.model('Branch', BranchSchema));
