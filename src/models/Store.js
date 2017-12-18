const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

// this is a Singleton
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!' // act as required : true but display the message
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address:{
      type: String,
      required: 'You must supply an address!'
    }
  }
});

// autogenerate slug based on store name
storeSchema.pre('save', function (next) {
  //we only need to run the function if the name change
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  next();
  // TODO make more resiliant so slugs are unique
})

module.exports = mongoose.model('Store', storeSchema);