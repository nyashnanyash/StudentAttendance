const axios = require('axios');
const readline = require('readline');

const baseURL = 'https://studentattendance-k0pw.onrender.com';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForCredentials(callback) {
  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      callback(username, password);
    });
  });
}

async function login(username, password) {
  try {
    const response = await axios.post(`${baseURL}/login`, { username, password });
    console.log('Login successful.');
    return response.data.accessToken;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

async function fetchAllUsers(token) {
  try {
    const response = await axios.get(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('All users:', response.data);
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);
  }
}

async function main() {
  promptForCredentials(async (username, password) => {
    const token = await login(username, password);
    if (token) {
      fetchAllUsers(token);
    }
    rl.close();
  });
}

main();
