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

async function updateStudent(token, studentId, updatedStudent) {
  try {
    const response = await axios.put(`${baseURL}/students/${studentId}`, updatedStudent, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating student:', error.response ? error.response.data : error.message);
  }
}

async function main() {
  promptForCredentials(async (username, password) => {
    const token = await login(username, password);
    if (token) {
      const studentId = 'your-student-id'; // Replace with the student ID you want to update
      const updatedStudent = { name: 'Updated Name', reg_no: 'Updated Reg No', institution_id: 'Updated Institution ID' }; // Replace with the updated student object
      updateStudent(token, studentId, updatedStudent);
    }
    rl.close();
  });
}

main();
