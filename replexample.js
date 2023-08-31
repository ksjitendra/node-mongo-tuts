function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  
  // Test the distance calculation
  const distance = calculateDistance(37.7749, -122.4194, 34.0522, -118.2437);
  console.log(distance);

  // price calculation
  function calculateRidePrice(distance, baseFare, pricePerKm) {
    const totalPrice = baseFare + distance * pricePerKm;
    return totalPrice;
  }
  
  // Test the ride price calculation
  const distance = 10; // in kilometers
  const baseFare = 5; // in currency
  const pricePerKm = 2; // in currency
  const totalPrice = calculateRidePrice(distance, baseFare, pricePerKm);
  console.log(totalPrice);

  // user authentication 
  // Simulating user authentication
function authenticateUser(username, password) {
    // Code for validating user credentials and returning a token or session
    // Simulated example:
    if (username === 'example' && password === 'password') {
      return 'token123';
    } else {
      throw new Error('Invalid username or password');
    }
  }
  
  // Test user authentication
  const username = 'example';
  const password = 'password';
  try {
    const authToken = authenticateUser(username, password);
    console.log('Authentication successful. Auth token:', authToken);
  } catch (error) {
    console.log('Authentication failed:', error.message);
  }

  
  // database operations
  // Simulating database connection and query
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true });

const User = mongoose.model('User', { name: String, email: String });

async function createUser(name, email) {
  const user = new User({ name, email });
  await user.save();
  console.log('User created:', user);
}

// Test creating a user
createUser('John Doe', 'john@example.com');
