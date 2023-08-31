// api.test.js
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { fetchDataFromAPI } = require('./api');

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

// Mock the API endpoint and response
mock.onGet('https://api.example.com/data').reply(200, {
  id: 1,
  name: 'Mocked Data',
});

describe('fetchDataFromAPI', () => {
  it('fetches data from the API', async () => {
    const data = await fetchDataFromAPI();
    expect(data).toEqual({
      id: 1,
      name: 'Mocked Data',
    });
  });

  it('handles API errors', async () => {
    mock.onGet('https://api.example.com/data').reply(500, 'Internal Server Error');

    await expect(fetchDataFromAPI()).rejects.toThrow('Request failed with status code 500');
  });
});
