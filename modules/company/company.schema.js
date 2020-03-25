const mongoose = require('mongoose');

const slugify = require('slugify');

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description can not be more than 500 characters']
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    companyPhone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    companyEmail: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    companyManger: {
      name: String
    },
    companyMangerTelphonenumber: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    companyAddress: {
      type: String,
      required: [true, 'Please add company address']
    },

    location: {
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
    CompanyCoverPhoto: {
      type: String,
      default: 'no-photo.jpg'
    },
    selerStatus: {
      // Array of strings
      type: String,
      required: true,
      enum: [
        'vendor',
        'consumer',
        'Supplier',
        'Specific clients',
        'Exclude clients',
        'Other'
      ]
    },
    delivery: {
      type: String,
      required: true,
      enum: ['By the seler', 'Through the shipping company']
    },
    saleWay: {
      type: String,
      enum: ['from the same place', 'from diffrent places']
    },

    saleAddress: {
      type: String,
      required: [true, 'Please add an sale address']
    },
    salelocation: {
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

    files: {
      type: [String]
    },
    accepted: {
      type: Boolean,
      default: false
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

CompanySchema.pre('save', function(next) {
  this.slug = slugify(this.companyName, { lower: true });
  next();
});
// GEOCODE & CREATE LOCATION FIELD
CompanySchema.pre('save', async function(next) {
  this.salelocation = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Do not save address in DB
  this.companyAddress = undefined;
  this.saleAddress = undefined;
  next();
});

// cascade delete branches when company is deleted
CompanySchema.pre('remove', async function(next) {
  console.log(
    `Branches being removed from company name ${this.companyName} with that id ${this.id}`
  );

  await this.model('Branch').deleteMany({ commpany: this._id });
  next();
});

// reverse branches virtual populaion inside company
CompanySchema.virtual('branches', {
  ref: 'Branch',
  localField: '_id',
  foreignField: 'company',
  justOne: false
});

module.exports = mongoose.model('Company', CompanySchema);
