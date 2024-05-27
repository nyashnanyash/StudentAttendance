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

async function addStudent(studentData, token) {
  try {
    const response = await axios.post(`${baseURL}/students`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student added successfully:', response.data);
  } catch (error) {
    console.error('Error adding student:', error.response ? error.response.data : error.message);
  }
}

function promptForCredentials(callback) {
  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      callback(username, password);
    });
  });
}

function promptForStudentData(callback) {
  rl.question('Enter student name: ', (name) => {
    rl.question('Enter student registration number: ', (reg_no) => {
      rl.question('Enter student institution ID: ', (institution_id) => {
        callback({ name, reg_no, institution_id });
      });
    });
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
    
    promptForStudentData((studentData) => {
      addStudent(studentData, token);
      rl.close();
    });
  });
}

main();
