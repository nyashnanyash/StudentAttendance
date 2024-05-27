const axios = require('axios');
const readline = require('readline');

// Define the base URL of your API
const baseURL = 'https://studentattendance-k0pw.onrender.com';

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt for username and password
function promptForCredentials(callback) {
  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      callback(username, password);
    });
  });
}

// Function to login
async function login(username, password) {
  try {
    const response = await axios.post(`${baseURL}/login`, {
      username: username,
      password: password
    });
    console.log('Login successful. JWT token:', response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Main function
function main() {
  promptForCredentials((username, password) => {
    login(username, password).then((accessToken) => {
      rl.close();
    });
  });
}

// Call the main function
main();
