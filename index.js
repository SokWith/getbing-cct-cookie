// Import the modules
const express = require('express');
const axios = require('axios');

// Create an express app
const app = express();

// Define a route for the root path
app.get('/', async (req, res) => {
  // Initialize a counter for the loop
  let count = 0;
  // Initialize a flag for the success
  let success = false;
  // Loop until success or 10 times
  while (!success && count < 10) {
    try {
      // Fetch the cookies from the given URL
      let response = await axios.get('https://proxybing.nbing.eu.org/turing/captcha/challenge');
      // Set the success flag to true
      success = true;
      // Get the cookies from the response header
      let cookies = response.headers['set-cookie'];
      // Remove all the "Path=/" from the cookies
      cookies = cookies.map(cookie => cookie.replace('Path=/', ''));
      // Join the cookies with semicolons
      cookies = cookies.join('; ');
      // Create a JSON object with the cookies as a property
      let result = {result: {cookies: cookies}};
      // Return the JSON object as the body of the response
      res.json(result);
    } catch (error) {
      // Increment the counter
      count++;
    }
  }
  // If the loop ends without success, return an error message
  if (!success) {
    res.status(500).send('Failed to get cookies');
  }
});

// Run the express app, listen on port 10000
app.listen(10000, () => {
  console.log('App is running on port 10000');
});
