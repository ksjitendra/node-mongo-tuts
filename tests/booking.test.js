
const request = require('supertest');
const express = require('express');
const app = express();
// const app = require('../app');

const port = 3000; // Specify the port number you want to listen on

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

describe('User Create API', () => {
    describe('POST /create/user', () => {
      it('should create a new user', async () => {

        // mock data for user creation
        const userData = {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          password: 'john@4321',
          user_type: 1,
          age: 22
        };

        // try {

            const response = await request(app)
            .post('/create/user')
            .send(userData);
            
        // } catch (error) {
            
            // console.log('Message: ' + error.message);
        // }

        expect(response.statusCode).toBe(200);

  
        
        // expect(response.statusCode).toBe(201);
        // expect(response.body).toHaveProperty('id');
        // expect(response.body.name).toBe(bookingData.name);
        // expect(response.body.email).toBe(bookingData.email);
        // expect(response.body.password).toBe(bookingData.password);
        // expect(response.body.user_type).toBe(bookingData.user_type);
        // expect(response.body.age).toBe(bookingData.age);
      });
    });
  
    // Add more test cases for other booking-related APIs here...
  });
  