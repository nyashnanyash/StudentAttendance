// Import required module
const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'busfousvdhmthibyluss-mysql.services.clever-cloud.com',
    user: 'ujvr7sawc9cbe6ro',
    password: 'GB0zH5EtlTrSKg4ur8re',
    database: 'busfousvdhmthibyluss'
});

// Function to get all students from the database
exports.getAllStudents = (callback) => {
    pool.query('SELECT * FROM student', (error, results, fields) => {
        if (error) {
            console.error('Error retrieving students:', error);
            callback(error, null);
            return;
        }

        callback(null, results);
    });
};

// Method to get a student by ID
exports.getStudentById = (id, callback) => {
    // Define the SQL query to retrieve a student by ID
    const query = 'SELECT * FROM student WHERE id = ?';

    // Execute the query to retrieve the student
    pool.query(query, [id], (error, results) => {
        if (error) {
            callback(error);
            return;
        }

        // If successful, invoke the callback with null for the error and the student data
        callback(null, results[0]); // Assuming there is only one student with the given ID
    });
};


// Method to add a new student
exports.addStudent = (name, reg_no, institution_id, callback) => {
    // Construct the SQL query to insert a new student
    const studentQuery = 'INSERT INTO student (name, reg_no, institution_id) VALUES (?, ?, ?)';

    // Execute the query to insert student data
    pool.query(studentQuery, [name, reg_no, institution_id], (studentError, studentResults, studentFields) => {
        if (studentError) {
            console.error('Error adding student:', studentError);
            callback(studentError);
            return;
        }
        callback(null, 'Student added successfully');
    });
};



// Method to update a student
exports.updateStudent = (id, name, reg_no, institution_id, created_by, callback) => {
    // Construct the SQL query to update the student
    const query = 'UPDATE student SET name = ?, reg_no = ?, institution_id = ?, created_by = ? WHERE id = ?';
    
    // Execute the query
    pool.query(query, [name, reg_no, institution_id, created_by, id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }

        callback(null, 'Student updated successfully');
    });
};

// Method to partially update a student
exports.partialUpdateStudent = (id, updatedFields, callback) => {
    // Construct the SQL query to update the student record
    let query = 'UPDATE student SET ';
    const values = [];
    
    // Iterate over the updatedFields object and build the SET clause of the query
    Object.keys(updatedFields).forEach((key, index) => {
        query += `${key} = ?`;
        values.push(updatedFields[key]);
        
        // Add comma if it's not the last field
        if (index < Object.keys(updatedFields).length - 1) {
            query += ', ';
        }
    });

    // Add the WHERE clause to specify the student ID
    query += ' WHERE id = ?';
    values.push(id);

    // Execute the query
    pool.query(query, values, (error, results, fields) => {
        if (error) {
            // If an error occurs, invoke the callback with the error
            callback(error);
            return;
        }

        // If the update is successful, invoke the callback with null for the error
        callback(null, 'Student updated successfully');
    });
};

// Method to delete a student and associated user
exports.deleteStudent = (id, callback) => {
    // Construct the SQL query to delete the student and associated user
    const query = 'DELETE FROM student WHERE id = ?';

    // Execute the query
    pool.query(query, [id], (error, results, fields) => {
        if (error) {
            callback(error);
            return;
        }

        callback(null, 'Student and associated user deleted successfully');
    });
};

