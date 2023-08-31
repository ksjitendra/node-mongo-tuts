const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();

// Endpoint to process a payment
app.post('/process-payment', [
  body('creditCardNumber').isCreditCard(),
  body('expirationDate').isDate(),
  body('cvv').isNumeric().isLength({ min: 3, max: 4 })
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Respond with validation errors
    return res.status(400).json({ errors: errors.array() });
  }

  // Payment processing logic
  // ...
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
