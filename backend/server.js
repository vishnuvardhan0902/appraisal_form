const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const path = require('path');
const app = express();
const port = 3002;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

// Fetch employee data
app.get('/employee', (req, res) => {
  const query = 'SELECT * FROM employees WHERE id = ?';
  const employeeId = 1; // Example ID, adjust as needed

  connection.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error fetching employee data:', err);
      res.status(500).send('Error fetching employee data');
      return;
    }
    res.json(results[0]);
  });
});

// Update employee data
app.put('/employee', (req, res) => {
  const {
    id, username, password, nameOfEmployee, dateOfBirth, dateOfJoining,
    currentDesignation, department, assessmentPeriod, presentPay, leavesAvailed,
    educationalQualifications, higherQualifications, specialization, periodOfService,
    experienceBeforeJoining, totalExperience, contactAddress
  } = req.body;

  const query = `
    UPDATE employees 
    SET username = ?, password = ?, nameOfEmployee = ?, dateOfBirth = ?, dateOfJoining = ?, currentDesignation = ?, 
        department = ?, assessmentPeriod = ?, presentPay = ?, leavesAvailed = ?, educationalQualifications = ?, 
        higherQualifications = ?, specialization = ?, periodOfService = ?, experienceBeforeJoining = ?, 
        totalExperience = ?, contactAddress = ?
    WHERE id = ?
  `;

  connection.query(query, [
    username, password, nameOfEmployee, dateOfBirth, dateOfJoining, currentDesignation,
    department, assessmentPeriod, presentPay, leavesAvailed, educationalQualifications,
    higherQualifications, specialization, periodOfService, experienceBeforeJoining,
    totalExperience, contactAddress, id
  ], (err, results) => {
    if (err) {
      console.error('Error updating employee data:', err);
      res.status(500).send('Error updating employee data');
      return;
    }
    res.json(req.body);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
