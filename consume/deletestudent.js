const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function deleteStudent(id, token) {
  try {
    const response = await axios.delete(`${baseURL}/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting student:', error.response.data);
  }
}

module.exports = deleteStudent;
