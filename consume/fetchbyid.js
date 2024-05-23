const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function fetchStudentById(id, token) {
  try {
    const response = await axios.get(`${baseURL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student retrieved successfully:', response.data);
  } catch (error) {
    console.error('Error fetching student:', error.response.data);
  }
}

module.exports = fetchStudentById;
