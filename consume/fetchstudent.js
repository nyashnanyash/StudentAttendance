const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function fetchStudents(token) {
  try {
    const response = await axios.get(`${baseURL}/students`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Students retrieved successfully:', response.data);
  } catch (error) {
    console.error('Error fetching students:', error.response.data);
  }
}

module.exports = fetchStudents;
