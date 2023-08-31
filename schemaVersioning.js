// assuming we have this model 
const bookingSchema = new mongoose.Schema({
    customerName: {
      type: String,
      required: true
    },
    pickupLocation: {
      type: String,
      required: true
    },
    dropoffLocation: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      required: true
    }
  });

  // Then we need to add one more file to it, so we have to add schena versioning colums in it
  // so that we can distinguish data relations to which version

  const bookingSchema = new mongoose.Schema({
    schemaVersion: {
      type: Number,
      default: 1
    },
    customerName: {
      type: String,
      required: true
    },
    pickupLocation: {
      type: String,
      required: true
    },
    dropoffLocation: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      required: true
    }
  });

  // after adding the new column we have to sync data in previous data as well so when we will migrate data we should
  // follo this 
  const Booking = require('./path/to/booking/model');

  async function migrateBookingSchema() {
    const bookings = await Booking.find({ schemaVersion: { $lt: 2 } });
    
    for (const booking of bookings) {
      booking.paymentMethod = 'unknown';
      booking.schemaVersion = 2;
      await booking.save();
    }
  
    console.log('Booking schema migration completed.');
  }
  
  migrateBookingSchema().catch(console.error);
  
  