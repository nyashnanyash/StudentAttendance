const axios = require('axios');
const readline = require('readline');

const baseURL = 'https://studentattendance-k0pw.onrender.com';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function login(username, password) {
  try {
    const response = await axios.post(`${baseURL}/login`, {
      username: username,
      password: password
    });
    return response.data.accessToken;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

async function deleteStudent(id, token) {
  try {
    const response = await axios.delete(`${baseURL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting student:', error.response ? error.response.data : error.message);
  }
}

function promptForCredentials(callback) {
  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      callback(username, password);
    });
  });
}

function promptForStudentId(callback) {
  rl.question('Enter the ID of the student to delete: ', (id) => {
    callback(id);
  });
}

async function main() {
  promptForCredentials(async (username, password) => {
    const token = await login(username, password);
    if (!token) {
      console.log('Login failed. Exiting...');
      rl.close();
      return;
    }
    console.log('Login successful. Access token:', token);
    
    promptForStudentId((id) => {
      deleteStudent(id, token);
      rl.close();
    });
  });
}

main();
