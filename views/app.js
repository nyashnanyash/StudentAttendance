const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const studentController = require('../controllers/studentController');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const app = express();
const port = 3306;

// Set up middleware
app.use(bodyParser.json());

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.post('/login', userController.login);
app.get('/students', authenticateToken, studentController.getAllStudents);
app.get('/students/:id', authenticateToken, studentController.getStudentById);
app.post('/students', authenticateToken, studentController.addStudent);
app.put('/students/:id', authenticateToken, studentController.updateStudent);
app.patch('/students/:id', authenticateToken, studentController.partialUpdateStudent);
app.delete('/students/:id', authenticateToken, studentController.deleteStudent);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
