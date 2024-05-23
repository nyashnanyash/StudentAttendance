const axios = require('axios');

const baseURL = 'http://localhost:3000';

async function partialUpdateStudent(id, updatedFields, token) {
  try {
    const response = await axios.patch(`${baseURL}/students/${id}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Student partially updated successfully:', response.data);
  } catch (error) {
    console.error('Error partially updating student:', error.response.data);
  }
}

module.exports = partialUpdateStudent;
