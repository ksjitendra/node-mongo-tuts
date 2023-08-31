// wrong code 
function bookCab(user, location, callback) {
    validateUser(user, function(err, isValid) {
      if (err) {
        callback(err);
      } else {
        findAvailableDriver(location, function(err, driver) {
          if (err) {
            callback(err);
          } else {
            reserveCab(driver, function(err, booking) {
              if (err) {
                callback(err);
              } else {
                callback(null, booking);
              }
            });
          }
        });
      }
    });
  }

  // Right Approach 
  const EventEmitter = require('events');

class CabBooking extends EventEmitter {
  bookCab(user, location) {
    this.validateUser(user)
      .then((isValid) => this.findAvailableDriver(location))
      .then((driver) => this.reserveCab(driver))
      .then((booking) => this.emit('bookingSuccess', booking))
      .catch((error) => this.emit('bookingError', error));
  }

  validateUser(user) {
    return new Promise((resolve, reject) => {
      // User validation logic
      if (user.isValid()) {
        resolve(true);
      } else {
        reject(new Error('Invalid user'));
      }
    });
  }

  findAvailableDriver(location) {
    return new Promise((resolve, reject) => {
      // Driver finding logic
      if (location.hasAvailableDriver()) {
        resolve(location.getDriver());
      } else {
        reject(new Error('No available driver'));
      }
    });
  }

  reserveCab(driver) {
    return new Promise((resolve) => {
      // Cab reservation logic
      const booking = createBooking(driver);
      resolve(booking);
    });
  }
}

// Usage
const cabBooking = new CabBooking();
cabBooking.on('bookingSuccess', (booking) => {
  console.log('Booking successful:', booking);
});
cabBooking.on('bookingError', (error) => {
  console.error('Booking failed:', error);
});

const user = getUser(); // Retrieve user details
const location = getLocation(); // Retrieve location details

cabBooking.bookCab(user, location);


// In the right code approach, events are used to handle asynchronous operations. The code is structured in a more modular and readable way, eliminating the callback nesting.

// The CabBooking class extends EventEmitter and emits events for booking success and failure. Promises are used for handling asynchronous operations, making the code more straightforward and easier to understand. Listeners are attached to the bookingSuccess and bookingError events to handle the corresponding outcomes.

// This approach improves code organization, readability, and maintainability. It avoids callback hell and promotes a more modular and event-driven architecture, making it easier to add, modify, or remove functionality in the cab booking app.