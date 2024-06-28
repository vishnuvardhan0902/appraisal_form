const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3002;

// MySQL database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Vishnu@0902',
  database: 'fp',
  connectionLimit: 10,
});

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());

// Fetch employee data by username
app.get('/employee', (req, res) => {
  const { username } = req.query;
  if (!username) {
    res.status(400).send('Username is required');
    return;
  }

  const query = `
    SELECT 
      id, 
      username, 
      password, 
      nameOfEmployee, 
      DATE_FORMAT(dateOfBirth, '%Y-%m-%d') AS dateOfBirth, 
      DATE_FORMAT(dateOfJoining, '%Y-%m-%d') AS dateOfJoining, 
      currentDesignation, 
      department, 
      assessmentPeriod, 
      presentPay, 
      leavesAvailed, 
      educationalQualifications, 
      higherQualifications, 
      specialization, 
      periodOfService, 
      experienceBeforeJoining, 
      totalExperience, 
      contactAddress 
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
app.put('/employee', (req, res) => {
  const {
    id, username, password, nameOfEmployee, dateOfBirth, dateOfJoining,
    currentDesignation, department, assessmentPeriod, presentPay, leavesAvailed,
    educationalQualifications, higherQualifications, specialization, periodOfService,
    experienceBeforeJoining, totalExperience, contactAddress
  } = req.body;

  console.log('Received data for update:', req.body); // Log received data

  if (!id) {
    res.status(400).send('Employee ID is required');
    return;
  }

  const query = `
    UPDATE employees 
    SET username = ?, password = ?, nameOfEmployee = ?, dateOfBirth = ?, dateOfJoining = ?, currentDesignation = ?, 
        department = ?, assessmentPeriod = ?, presentPay = ?, leavesAvailed = ?, educationalQualifications = ?, 
        higherQualifications = ?, specialization = ?, periodOfService = ?, experienceBeforeJoining = ?, 
        totalExperience = ?, contactAddress = ?
    WHERE id = ?
  `;

  pool.query(query, [
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

// Fetch all lectures
app.get('/api/lectures', (req, res) => {
  const query = 'SELECT * FROM Lectures ORDER BY sNo';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching lectures:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Add new lecture
app.post('/api/lectures', (req, res) => {
  const {
    sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
    teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore
  } = req.body;

  const query = `
    INSERT INTO Lectures (sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
                          teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(query, [
    sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
    teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore
  ], (err, result) => {
    if (err) {
      console.error('Error adding new lecture:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const newLecture = { id: result.insertId, sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore, teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore };
    res.status(201).json(newLecture);
  });
});

// Update a lecture
app.put('/api/lectures/:id', (req, res) => {
  const id = req.params.id;
  const {
    sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
    teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore
  } = req.body;

  const query = `
    UPDATE Lectures 
    SET sNo = ?, courseName = ?, techYearSemester = ?, novelMethodsDetails = ?,
        novelMethodsScore = ?, teachingPeriodsPlanned = ?, teachingPeriodsConducted = ?,
        classesEngaged = ?, totalScore = ?
    WHERE id = ?
  `;

  pool.query(query, [
    sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore,
    teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore, id
  ], (err, result) => {
    if (err) {
      console.error('Error updating lecture:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const updatedLecture = { id, sNo, courseName, techYearSemester, novelMethodsDetails, novelMethodsScore, teachingPeriodsPlanned, teachingPeriodsConducted, classesEngaged, totalScore };
    res.json(updatedLecture);
  });
});

// Delete a lecture
app.delete('/api/lectures/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM Lectures WHERE id = ?';

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting lecture:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.sendStatus(204); // No content response
  });
});

// Fetch all courses
app.get('/api/courses', (req, res) => {
  const query = 'SELECT * FROM Courses ORDER BY sNo';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Add new course
app.post('/api/courses', (req, res) => {
  const {
    sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
    attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore
  } = req.body;

  const query = `
    INSERT INTO Courses (sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
                         attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(query, [
    sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
    attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore
  ], (err, result) => {
    if (err) {
      console.error('Error adding new course:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const newCourse = { id: result.insertId, sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575, attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore };
    res.status(201).json(newCourse);
  });
});

// Update a course
app.put('/api/courses/:id', (req, res) => {
  const id = req.params.id;
  const {
    sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
    attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore
  } = req.body;

  const query = `
    UPDATE Courses 
    SET sNo = ?, courseName = ?, sizeOfClass = ?, studentsAttendance75 = ?, studentsAttendance6575 = ?,
        attendanceScore = ?, feedbackReceived = ?, gradeO = ?, gradeAB = ?, gradeCD = ?, resultsScore = ?, totalScore = ?
    WHERE id = ?
  `;

  pool.query(query, [
    sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575,
    attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore, id
  ], (err, result) => {
    if (err) {
      console.error('Error updating course:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const updatedCourse = { id, sNo, courseName, sizeOfClass, studentsAttendance75, studentsAttendance6575, attendanceScore, feedbackReceived, gradeO, gradeAB, gradeCD, resultsScore, totalScore };
    res.json(updatedCourse);
  });
});

// Delete a course
app.delete('/api/courses/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM Courses WHERE id = ?';

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting course:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.sendStatus(204); // No content response
  });
});
app.get('/api/academic-projects', (req, res) => {
  const query = 'SELECT * FROM AcademicProjects ORDER BY id';

  pool.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching academic projects:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(results.rows);
  });
});
// Fetch academic projects
app.get('/api/academic-projects', (req, res) => {
  const query = 'SELECT * FROM AcademicProjects ORDER BY id';

  pool.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching academic projects:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }
      res.json(results || []); // Ensure an empty array is returned if there are no results
  });
});

// Update academic projects
app.put('/api/academic-projects', (req, res) => {
  const projectsData = req.body;

  const deleteQuery = 'DELETE FROM AcademicProjects';
  const insertQuery = `
    INSERT INTO AcademicProjects (id, sNo, course, projectType, numberOfBatchesOrStudents, score)
    VALUES ?
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        console.error('Error starting transaction:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      connection.query(deleteQuery, (err) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            console.error('Error deleting existing projects:', err);
            res.status(500).json({ error: 'Internal server error' });
          });
        }

        const values = projectsData.map(project => [
          project.id, project.sNo, project.course, project.projectType, project.numberOfBatchesOrStudents, project.score
        ]);

        connection.query(insertQuery, [values], (err) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              console.error('Error inserting projects:', err);
              res.status(500).json({ error: 'Internal server error' });
            });
          }

          connection.commit((err) => {
            connection.release();
            if (err) {
              console.error('Error committing transaction:', err);
              res.status(500).json({ error: 'Internal server error' });
              return;
            }

            res.json(projectsData);
          });
        });
      });
    });
  });
});
// Fetch all citations
app.get('/api/citations', (req, res) => {
  const query = 'SELECT * FROM Citations ORDER BY sNo';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching citations:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Add new citation
app.post('/api/citations', (req, res) => {
  const {
    sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
    hIndex, score
  } = req.body;

  const query = `
    INSERT INTO Citations (sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
                           hIndex, score)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  pool.query(query, [
    sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
    hIndex, score
  ], (err, result) => {
    if (err) {
      console.error('Error adding new citation:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const newCitation = { id: result.insertId, sNo, publicationsTillDate, publicationsWithCitations, totalCitations, hIndex, score };
    res.status(201).json(newCitation);
  });
});

// Update a citation
app.put('/api/citations/:id', (req, res) => {
  const id = req.params.id;
  const {
    sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
    hIndex, score
  } = req.body;

  const query = `
    UPDATE Citations 
    SET sNo = ?, publicationsTillDate = ?, publicationsWithCitations = ?, totalCitations = ?,
        hIndex = ?, score = ?
    WHERE id = ?
  `;

  pool.query(query, [
    sNo, publicationsTillDate, publicationsWithCitations, totalCitations,
    hIndex, score, id
  ], (err, result) => {
    if (err) {
      console.error('Error updating citation:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const updatedCitation = { id, sNo, publicationsTillDate, publicationsWithCitations, totalCitations, hIndex, score };
    res.json(updatedCitation);
  });
});

// Delete a citation
app.delete('/api/citations/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM Citations WHERE id = ?';

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting citation:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.sendStatus(204); // No content response
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
