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
    const response = await axios.post(`${baseURL}/login`, { user_name: username, password: password });
    console.log('Login successful.');
    return response.data.accessToken;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

async function updateStudent(token, studentId, updatedFields) {
  try {
    const response = await axios.patch(`${baseURL}/students/${studentId}`, updatedFields, {
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
      rl.question('Enter the student ID to update: ', (studentId) => {
        const updatedFields = {};
        rl.question(`Enter new name (Press Enter to keep unchanged): `, (name) => {
          updatedFields.name = name.trim();
          rl.question(`Enter new registration number (Press Enter to keep unchanged): `, (regNo) => {
            updatedFields.reg_no = regNo.trim();
            rl.question(`Enter new institution ID (Press Enter to keep unchanged): `, (institutionId) => {
              updatedFields.institution_id = institutionId.trim();
              updateStudent(token, studentId, updatedFields);
              rl.close();
            });
          });
        });
      });
    } else {
      rl.close();
    }
  });
}

main();
