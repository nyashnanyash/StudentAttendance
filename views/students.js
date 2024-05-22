document.addEventListener('DOMContentLoaded', function () {
    const addStudentForm = document.getElementById('addStudentForm');
    const addStudentResult = document.getElementById('addStudentResult');
    const studentListDiv = document.getElementById('studentList');

    addStudentForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const regNo = document.getElementById('regNo').value;
        const institutionId = document.getElementById('institutionId').value;

        try {
            const response = await fetch('/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, reg_no: regNo, institution_id: institutionId })
            });

            const data = await response.json();
            addStudentResult.textContent = JSON.stringify(data);

            // Refresh student list after adding student
            await getAllStudents();
        } catch (error) {
            console.error('Error:', error);
            addStudentResult.textContent = 'An error occurred. Please try again later.';
        }
    });

    // Function to get all students and display them
    async function getAllStudents() {
        try {
            const response = await fetch('/students');
            const students = await response.json();

            studentListDiv.innerHTML = '';

            students.forEach(student => {
                const studentItem = document.createElement('div');
                studentItem.textContent = `Name: ${student.name}, Registration Number: ${student.reg_no}`;
                studentListDiv.appendChild(studentItem);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    // Call getAllStudents function on page load
    getAllStudents();
});
