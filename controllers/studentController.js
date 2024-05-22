const studentModel = require('../models/studentModel');

// Route to get all students
exports.getAllStudents = (req, res) => {
    studentModel.getAllStudents((error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error retrieving students' });
            return;
        }
        res.json(results);
    });
};

// Route to get a student by ID
exports.getStudentById = (req, res) => {
    const { id } = req.params;

    studentModel.getStudentById(id, (error, student) => {
        if (error) {
            res.status(500).json({ error: 'Error retrieving student' });
            return;
        }
        res.json(student);
    });
};

// Route to add a new student
exports.addStudent = (req, res) => {
    const { name, reg_no, institution_id } = req.body;

    studentModel.addStudent(name, reg_no, institution_id, (error, message) => {
        if (error) {
            res.status(500).json({ error: 'Error adding student' });
            return;
        }
        res.json({ message });
    });
};

// Route to update a student
exports.updateStudent = (req, res) => {
    const { id } = req.params;
    const { name, reg_no, institution_id } = req.body;

    studentModel.updateStudent(id, name, reg_no, institution_id, (error, message) => {
        if (error) {
            res.status(500).json({ error: 'Error updating student' });
            return;
        }
        res.json({ message });
    });
};

// Route to partially update a student
exports.partialUpdateStudent = (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    studentModel.partialUpdateStudent(id, updatedFields, (error, message) => {
        if (error) {
            res.status(500).json({ error: 'Error partially updating student' });
            return;
        }
        res.json({ message });
    });
};

// Route to delete a student
exports.deleteStudent = (req, res) => {
    const { id } = req.params;

    studentModel.deleteStudent(id, (error, message) => {
        if (error) {
            res.status(500).json({ error: 'Error deleting student' });
            return;
        }
        res.json({ message });
    });
};
