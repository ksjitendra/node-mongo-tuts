const { Transform } = require('stream');

// Custom transform stream to filter ride requests
class RideRequestFilter extends Transform {
  constructor(options) {
    super(options);
  }
  
  _transform(chunk, encoding, callback) {
    const rideRequest = JSON.parse(chunk);
    
    // Filter or modify the ride request
    const filteredRequest = /* Filter logic */;
    
    // Push the modified request to the output stream
    this.push(JSON.stringify(filteredRequest));
    
    callback();
  }
}

// Usage example
const rideRequestFilter = new RideRequestFilter();

// Process incoming ride requests
rideRequestStream
  .pipe(rideRequestFilter)
  .on('data', function(filteredRequest) {
    // Handle filtered ride request
  })
  .on('error', function(err) {
    // Handle error
  });
