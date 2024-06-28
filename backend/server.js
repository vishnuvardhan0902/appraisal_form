const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3002;


app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());


// MySQL database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'snow',
  connectionLimit: 10,
});


// Fetch employee data by username
app.get('/getEmp/:username', (req, res) => {
  // console.log(req);
  const { username } = req.params;
  if (!username) {
    res.status(400).send('Username is required');
    return;
  }

  const query = `
    SELECT *
    FROM employees 
    WHERE username = ?
  `;

  pool.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching employee data:', err);
      res.status(500).send('Error fetching employee data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Employee not found');
      return;
    }
    res.json(results[0]);
  });
});


// Update employee data
app.put('/updateEmp', (req, res) => {
  const {
    username, password, nameOfEmployee, dateOfBirth, dateOfJoining,
    currentDesignation, department, assessmentPeriod, presentPay, leavesAvailed,
    educationalQualifications, higherQualifications, specialization, periodOfService,
    experienceBeforeJoining, totalExperience, contactAddress, empType
  } = req.body;

  console.log('Received data for update:-', req.body); // Log received data

  const query = `
    UPDATE employees 
    SET password = ?, nameOfEmployee = ?, dateOfBirth = ?, dateOfJoining = ?, currentDesignation = ?, 
        department = ?, assessmentPeriod = ?, presentPay = ?, leavesAvailed = ?, educationalQualifications = ?, 
        higherQualifications = ?, specialization = ?, periodOfService = ?, experienceBeforeJoining = ?, 
        totalExperience = ?, contactAddress = ?, empType=?
    WHERE username = ?
  `;

  pool.query(query, [
    password, nameOfEmployee, dateOfBirth, dateOfJoining, currentDesignation,
    department, assessmentPeriod, presentPay, leavesAvailed, educationalQualifications,
    higherQualifications, specialization, periodOfService, experienceBeforeJoining,
    totalExperience, contactAddress, empType, username
  ], (err, results) => {
    if (err) {
      console.error('Error updating employee data:', err);
      res.status(500).send('Error updating employee data');
      return;
    }
    res.send("Successfully Updated");
  });
});


app.post('/register', (req, res) => {
  const data = req.body;
  console.log(data);

  // Check if the user already exists
  const checkQuery = 'SELECT * FROM employees WHERE username = ?';
  pool.query(checkQuery, [data.username], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking if user exists:', checkErr);
      res.status(500).send('Error checking if user exists');
      return;
    }

    if (checkResults.length > 0) {
      console.log('User already exists:', checkResults[0]);
      res.status(409).send('User already exists');
      return;
    }

    // Construct the query to insert the new user
    const insertQuery = `
      INSERT INTO employees (
        username, password, nameOfEmployee, dateOfBirth, dateOfJoining, 
        currentDesignation, department, assessmentPeriod, presentPay, 
        leavesAvailed, educationalQualifications, higherQualifications, 
        specialization, periodOfService, experienceBeforeJoining, 
        totalExperience, contactAddress, empType
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Prepare the values
    const values = [
      data.username, data.password, data.nameOfEmployee, data.dateOfBirth, data.dateOfJoining,
      data.currentDesignation, data.department, data.assessmentPeriod, data.presentPay,
      data.leavesAvailed, data.educationalQualifications, data.higherQualifications,
      data.specialization, data.periodOfService, data.experienceBeforeJoining,
      data.totalExperience, data.contactAddress, data.empType
    ];

    // Execute the insert query
    pool.query(insertQuery, values, (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error inserting employee data:', insertErr);
        res.status(500).send('Error inserting employee data');
        return;
      }
      res.status(201).send('Employee registered successfully');
    });
  });
});


app.get('/login/:username', (req, res) => {
  const username = req.params.username;
  // console.log(username);
  pool.query(`SELECT * from employees where username=?`, [username], (err, results) => {
    // console.log(results);
    if (err) {
      console.error('Error fetching employee data:', err);
      res.status(500).send('Error fetching employee data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Employee not found');
      return;
    }
    res.json(results[0]);
  });
})



// // Fetch all lectures
// app.get('/api/lectures', (req, res) => {
//   const query = 'SELECT * FROM Lectures ORDER BY sNo';

//   pool.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching lectures:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.json(results);
//   });
// });

// // Add new lecture
// app.post('/api/lectures', (req, res) => {
//   const {
//     sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
//     teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore
//   } = req.body;

//   const query = `
//     INSERT INTO Lectures (sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
//                           teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   pool.query(query, [
//     sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
//     teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore
//   ], (err, result) => {
//     if (err) {
//       console.error('Error adding new lecture:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     const newLecture = { id: result.insertId, sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore, teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore };
//     res.status(201).json(newLecture);
//   });
// });

// // Update a lecture
// app.put('/api/lectures/:id', (req, res) => {
//   const id = req.params.id;
//   const {
//     sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
//     teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore
//   } = req.body;

//   const query = `
//     UPDATE Lectures 
//     SET sNo = ?, courseName = ?, techYearSemester = ?, novelMethodsDetails = ?,
//         novelMethodsScore = ?, teachingPeriodsPlanned = ?, teachingPeriodsConducted = ?,
//         classesEngaged = ?, totalScore = ?
//     WHERE id = ?
//   `;

//   pool.query(query, [
//     sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
//     teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore, id
//   ], (err, result) => {
//     if (err) {
//       console.error('Error updating lecture:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     const updatedLecture = { id, sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore, teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore };
//     res.json(updatedLecture);
//   });
// });

// // Delete a lecture
// app.delete('/api/lectures/:id', (req, res) => {
//   const id = req.params.id;

//   const query = 'DELETE FROM Lectures WHERE id = ?';

//   pool.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error deleting lecture:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.sendStatus(204); // No content response
//   });
// });

// // Fetch all courses
// app.get('/api/courses', (req, res) => {
//   const query = 'SELECT * FROM Courses ORDER BY sNo';

//   pool.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching courses:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.json(results);
//   });
// });

// // Add new course
// app.post('/api/courses', (req, res) => {
//   const {
//     sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
//     attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore
//   } = req.body;

//   const query = `
//     INSERT INTO Courses (sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
//                          attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   pool.query(query, [
//     sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
//     attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore
//   ], (err, result) => {
//     if (err) {
//       console.error('Error adding new course:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     const newCourse = { id: result.insertId, sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575, attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore };
//     res.status(201).json(newCourse);
//   });
// });

// // Update a course
// app.put('/api/courses/:id', (req, res) => {
//   const id = req.params.id;
//   const {
//     sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
//     attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore
//   } = req.body;

//   const query = `
//     UPDATE Courses 
//     SET sNo = ?, courseName = ?, sizeOfClass = ?, studentsAttendance75 = ?, studentsAttendance6575 = ?,
//         attendanceScore = ?, feedbackReceived = ?, gradeO = ?, gradeAB = ?, gradeCD = ?, resultsScore = ?, totalScore = ?
//     WHERE id = ?
//   `;

//   pool.query(query, [
//     sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
//     attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore, id
//   ], (err, result) => {
//     if (err) {
//       console.error('Error updating course:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     const updatedCourse = { id, sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575, attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore };
//     res.json(updatedCourse);
//   });
// });

// // Delete a course
// app.delete('/api/courses/:id', (req, res) => {
//   const id = req.params.id;

//   const query = 'DELETE FROM Courses WHERE id = ?';

//   pool.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error deleting course:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.sendStatus(204); // No content response
//   });
// });
// app.get('/api/academic-projects', (req, res) => {
//   const query = 'SELECT * FROM AcademicProjects ORDER BY id';

//   pool.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching academic projects:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.json(results.rows);
//   });
// });
// // Fetch academic projects
// app.get('/api/academic-projects', (req, res) => {
//   const query = 'SELECT * FROM AcademicProjects ORDER BY id';

//   pool.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching academic projects:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.json(results || []); // Ensure an empty array is returned if there are no results
//   });
// });

// // Update academic projects
// app.put('/api/academic-projects', (req, res) => {
//   const projectsData = req.body;

//   const deleteQuery = 'DELETE FROM AcademicProjects';
//   const insertQuery = `
//     INSERT INTO AcademicProjects (id, sNo, course, projectType, numberOfBatchesOrStudents, score)
//     VALUES ?
//   `;

//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error('Error getting connection:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     connection.beginTransaction((err) => {
//       if (err) {
//         connection.release();
//         console.error('Error starting transaction:', err);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }

//       connection.query(deleteQuery, (err) => {
//         if (err) {
//           return connection.rollback(() => {
//             connection.release();
//             console.error('Error deleting existing projects:', err);
//             res.status(500).json({ error: 'Internal server error' });
//           });
//         }

//         const values = projectsData.map(project => [
//           project.id, project.sNo, project.course, project.projectType, project.numberOfBatchesOrStudents, project.score
//         ]);

//         connection.query(insertQuery, [values], (err) => {
//           if (err) {
//             return connection.rollback(() => {
//               connection.release();
//               console.error('Error inserting projects:', err);
//               res.status(500).json({ error: 'Internal server error' });
//             });
//           }

//           connection.commit((err) => {
//             connection.release();
//             if (err) {
//               console.error('Error committing transaction:', err);
//               res.status(500).json({ error: 'Internal server error' });
//               return;
//             }

//             res.json(projectsData);
//           });
//         });
//       });
//     });
//   });
// });
// // Fetch all citations
// app.get('/api/citations', (req, res) => {
//   const query = 'SELECT * FROM Citations ORDER BY sNo';

//   pool.query(query, (err, results) => {
//     if (err) {
//       console.error('Error fetching citations:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.json(results);
//   });
// });

// // Add new citation
// app.post('/api/citations', (req, res) => {
//   const {
//     sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
//     hIndex, score
//   } = req.body;

//   const query = `
//     INSERT INTO Citations (sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
//                            hIndex, score)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   pool.query(query, [
//     sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
//     hIndex, score
//   ], (err, result) => {
//     if (err) {
//       console.error('Error adding new citation:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     const newCitation = { id: result.insertId, sNo, publicationsTillDate, publicationsWithCitations, totalCitations, hIndex, score };
//     res.status(201).json(newCitation);
//   });
// });

// // Update a citation
// app.put('/api/citations/:id', (req, res) => {
//   const id = req.params.id;
//   const {
//     sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
//     hIndex, score
//   } = req.body;

//   const query = `
//     UPDATE Citations 
//     SET sNo = ?, publicationsTillDate = ?, publicationsWithCitations = ?, totalCitations = ?,
//         hIndex = ?, score = ?
//     WHERE id = ?
//   `;

//   pool.query(query, [
//     sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
//     hIndex, score, id
//   ], (err, result) => {
//     if (err) {
//       console.error('Error updating citation:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     const updatedCitation = { id, sNo, publicationsTillDate, publicationsWithCitations, totalCitations, hIndex, score };
//     res.json(updatedCitation);
//   });
// });

// // Delete a citation
// app.delete('/api/citations/:id', (req, res) => {
//   const id = req.params.id;

//   const query = 'DELETE FROM Citations WHERE id = ?';

//   pool.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error deleting citation:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.sendStatus(204); // No content response
//   });
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
