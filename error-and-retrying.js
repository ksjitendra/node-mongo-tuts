const express = require('express');
const axios = require('axios');
const app = express();

// Endpoint to process a payment
app.post('/process-payment', async (req, res, next) => {
  const paymentData = req.body;

  try {
    // Call the payment gateway API to process the payment
    const paymentResult = await processPayment(paymentData);

    // Payment processed successfully
    res.json(paymentResult);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  // Log the error
  console.error('An error occurred while processing the payment:', error);

  // Respond with an appropriate error message
  res.status(500).json({ error: 'Payment processing failed' });
});

// Function to process the payment with retry logic
async function processPayment(paymentData, retryCount = 3) {
  try {
    // Call the payment gateway API to process the payment
    const paymentResult = await callPaymentGatewayAPI(paymentData);

    // Return the payment result if successful
    if (paymentResult.success) {
      return paymentResult;
    } else {
      // Retry the payment if it fails temporarily
      if (paymentResult.retry && retryCount > 0) {
        return processPayment(paymentData, retryCount - 1);
      } else {
        throw new Error('Payment processing failed');
      }
    }
  } catch (error) {
    // Retry the payment if there's a network error or server error
    if (retryCount > 0) {
      return processPayment(paymentData, retryCount - 1);
    } else {
      throw new Error('Payment processing failed');
    }
  }
}

// Function to call the payment gateway API
async function callPaymentGatewayAPI(paymentData) {
  // Simulating an HTTP request to the payment gateway API using axios
  try {
    const response = await axios.post('https://payment-gateway-api.com/process-payment', paymentData);
    return response.data;
  } catch (error) {
    // Handle network errors, server errors, or API-specific errors
    throw new Error('Payment processing failed');
  }
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// In this code snippet, we have an /process-payment endpoint that handles the payment processing. Inside the endpoint, the processPayment function is called to process the payment with retry logic.

// The processPayment function attempts to call the payment gateway API using the callPaymentGatewayAPI function. If the payment is successful, the payment result is returned. However, if the payment fails temporarily and the payment gateway indicates a need for retry (paymentResult.retry is true), the function recursively retries the payment with a reduced retry count.

// If there's a network error, server error, or if the maximum number of retries is reached, the processPayment function throws an error. This error is then caught by the error handling middleware, where you can log the error and respond with an appropriate error message.

// The callPaymentGatewayAPI function simulates making an HTTP request to the payment gateway API using the axios library. It handles network errors, server errors, or any API-specific errors by throwing an error, which is caught




