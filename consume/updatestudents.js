const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function updateStudent(id, updatedStudentData, token) {
  try {
    const response = await axios.put(`${baseURL}/students/${id}`, updatedStudentData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating student:', error.response.data);
  }
}

module.exports = updateStudent;
