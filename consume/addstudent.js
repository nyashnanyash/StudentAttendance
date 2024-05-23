const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function addStudent(studentData, token) {
  try {
    const response = await axios.post(`${baseURL}/students`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student added successfully:', response.data);
  } catch (error) {
    console.error('Error adding student:', error.response.data);
  }
}

module.exports = addStudent;
