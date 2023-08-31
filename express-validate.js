const express = require('express');
const { body, validationResult } = require('express-validator');
const mongodb = require('mongodb');

const app = express();
const MongoClient = mongodb.MongoClient;

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/your-db-name';

// Middleware to parse JSON requests
app.use(express.json());

// Create a new ride
app.post('/rides', [
  body('source').notEmpty().withMessage('Source is required'),
  body('destination').notEmpty().withMessage('Destination is required'),
  // Add more validation rules as per your requirements
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(mongoURI);
    const db = client.db();

    // Insert the ride details into the 'rides' collection
    const result = await db.collection('rides').insertOne(req.body);
    client.close();

    res.status(201).json({ message: 'Ride created successfully', rideId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all rides
app.get('/rides', async (req, res) => {
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(mongoURI);
    const db = client.db();

    // Retrieve all rides from the 'rides' collection
    const rides = await db.collection('rides').find().toArray();
    client.close();

    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
