const axios = require('axios');

// Define the base URL of your API
const baseURL = 'http://localhost:3000';

// Hardcoded username and password
const username = 'fofo';
const password = 'fofo';

// Function to login
async function login() {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username: username,
        password: password
      });
      console.log('Login successful. JWT token:', response.data.token);
      return response.data.token;
    } catch (error) {
      if (error.response) {
        console.error('Login failed:', error.response.data);
      } else {
        console.error('Login failed:', error.message);
      }
      console.error('Full error:', error); // Log the full error object
      return null;
    }
  }
  
// Function to interactively select HTTP method
function selectMethod(callback) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Select HTTP method (GET, POST, PUT, PATCH, DELETE): ', (method) => {
    callback(method.toUpperCase());
    rl.close();
  });
}

// Function to perform HTTP request
async function performRequest(method, token) {
  try {
    let response;
    switch (method) {
      case 'GET':
        response = await axios.get(`${baseURL}/students`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Students:', response.data);
        break;
      case 'POST':
        // Implement POST request logic here
        break;
      case 'PUT':
        // Implement PUT request logic here
        break;
      case 'PATCH':
        // Implement PATCH request logic here
        break;
      case 'DELETE':
        // Implement DELETE request logic here
        break;
      default:
        console.error('Invalid HTTP method');
        return;
    }
  } catch (error) {
    console.error(`Error ${method} request:`, error.response.data);
  }
}

// Main function
async function main() {
  const token = await login();
  if (token) {
    selectMethod((method) => {
      performRequest(method, token);
    });
  }
}

// Call the main function
main();
