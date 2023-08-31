// Refrencing approach 
// User model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // ... other user fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// Ride model
const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  },
  // ... other ride fields
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;


// finding the rides where user was involed as a passenger
const Ride = require('./models/Ride');

// Find rides where a user is a passenger
Ride.find({ passengers: userId })
  .populate('driver', 'name') // Populate the driver details
  .exec((err, rides) => {
    if (err) {
      console.error(err);
    } else {
      console.log(rides);
    }
  });

//   denormalisation 

const rideSchema = new mongoose.Schema({
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    passengers: [
      {
        name: String,
        email: String
      }
    ],
    startLocation: {
      type: String,
      required: true
    },
    endLocation: {
      type: String,
      required: true
    },
    // ... other ride fields
  });

  // Indexing 
  const rideSchema = new mongoose.Schema({
    // ... ride fields
  });
  
  // Create an index on startLocation field
  rideSchema.index({ startLocation: 1 });
  
  const Ride = mongoose.model('Ride', rideSchema);
  
  module.exports = Ride;

  
  // Now the main scenrario if user has changed his name so in that case we have to update his name in the all rides 
  const Ride = require('./models/Ride');

// Find and update rides where the passenger's data is embedded
Ride.updateMany(
  { 'passengers._id': passengerId }, // Find rides with the specific passenger
  { $set: { 'passengers.$.name': updatedName } }, // Update the passenger's name
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${result.nModified} ride(s) updated successfully.`);
    }
  }
);

