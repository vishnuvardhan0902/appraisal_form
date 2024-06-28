import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const CoursesTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/courses');
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    const updateCourseData = async (index, field, newValue) => {
        const courseId = courses[index].id;
        const updatedCourses = [...courses];
        updatedCourses[index] = { ...updatedCourses[index], [field]: newValue };

        try {
            await axios.put(`/api/courses/${courseId}`, updatedCourses[index]);
            setCourses(updatedCourses);
            updateUserData(updatedCourses);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const addNewRow = async () => {
        const newRow = {
            sNo: courses.length + 1,
            courseName: "",
            sizeOfClass: 0,
            studentsAttendance75: 0,
            studentsAttendance6575: 0,
            attendanceScore: 0,
            feedbackReceived: 0,
            gradeO: 0,
            gradeAB: 0,
            gradeCD: 0,
            resultsScore: 0,
            totalScore: 0
        };

        try {
            const response = await axios.post('/api/courses', newRow);
            const updatedCourses = [...courses, response.data];
            setCourses(updatedCourses);
            updateUserData(updatedCourses);
        } catch (error) {
            console.error('Error adding new course:', error);
        }
    };

    const deleteRow = async (index) => {
        const courseId = courses[index].id;

        try {
            await axios.delete(`/api/courses/${courseId}`);
            const updatedCourses = [...courses];
            updatedCourses.splice(index, 1);
            setCourses(updatedCourses);
            updateUserData(updatedCourses);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const updateUserData = (updatedCourses) => {
        const updatedUser = [{ ...user[0], secondTableData: updatedCourses }];
        const secondTableTotalScore = updatedCourses.reduce((total, course) => total + parseFloat(course.totalScore), 0);
        updatedUser[0].secondTableTotalScore = secondTableTotalScore;
        updatedUser[0].secondTableGrandTotalScore = secondTableTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return courses.reduce((total, course) => total + parseFloat(course.totalScore), 0);
    };

    return (
        <div className="courses-table-container">
            <h3>1.2 Courses Taught – Attendance, Feedback, and Results <span className='text-end '>Max. Score: 80</span></h3>
            <p>(For each Course Max. Score = 20 - Attendance (A) = 5, Feedback (B) = 5, Results (C) = 10)</p>
            
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Course Name</th>
                        <th>Size of Class</th>
                        <th>Students Attendance (75%)</th>
                        <th>Students Attendance (65-75%)</th>
                        <th>Attendance Score</th>
                        <th>Feedback Received</th>
                        <th>Grade O</th>
                        <th>Grade AB</th>
                        <th>Grade CD</th>
                        <th>Results Score</th>
                        <th>Total Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="13">Loading...</td>
                        </tr>
                    ) : courses.length > 0 ? (
                        courses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{course.sNo}</td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ width: '100%' }} // Expanded width for course name
                                            value={course.courseName}
                                            onChange={(e) => updateCourseData(index, 'courseName', e.target.value)}
                                        />
                                    ) : (
                                        course.courseName
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for size of class
                                            value={course.sizeOfClass}
                                            onChange={(e) => updateCourseData(index, 'sizeOfClass', e.target.value)}
                                        />
                                    ) : (
                                        course.sizeOfClass
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for attendance fields
                                            value={course.studentsAttendance75}
                                            onChange={(e) => updateCourseData(index, 'studentsAttendance75', e.target.value)}
                                        />
                                    ) : (
                                        course.studentsAttendance75
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for attendance fields
                                            value={course.studentsAttendance6575}
                                            onChange={(e) => updateCourseData(index, 'studentsAttendance6575', e.target.value)}
                                        />
                                    ) : (
                                        course.studentsAttendance6575
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for score fields
                                            value={course.attendanceScore}
                                            onChange={(e) => updateCourseData(index, 'attendanceScore', e.target.value)}
                                        />
                                    ) : (
                                        course.attendanceScore
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for score fields
                                            value={course.feedbackReceived}
                                            onChange={(e) => updateCourseData(index, 'feedbackReceived', e.target.value)}
                                        />
                                    ) : (
                                        course.feedbackReceived
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for grade fields
                                            value={course.gradeO}
                                            onChange={(e) => updateCourseData(index, 'gradeO', e.target.value)}
                                        />
                                    ) : (
                                        course.gradeO
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for grade fields
                                            value={course.gradeAB}
                                            onChange={(e) => updateCourseData(index, 'gradeAB', e.target.value)}
                                        />
                                    ) : (
                                        course.gradeAB
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for grade fields
                                            value={course.gradeCD}
                                            onChange={(e) => updateCourseData(index, 'gradeCD', e.target.value)}
                                        />
                                    ) : (
                                        course.gradeCD
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for score fields
                                            value={course.resultsScore}
                                            onChange={(e) => updateCourseData(index, 'resultsScore', e.target.value)}
                                        />
                                    ) : (
                                        course.resultsScore
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ width: '100px' }} // Adjusted width for total score field
                                            value={course.totalScore}
                                            onChange={(e) => updateCourseData(index, 'totalScore', e.target.value)}
                                        />
                                    ) : (
                                        course.totalScore
                                    )}
                                </td>
                                <td>
                                    {isEditable ? (
                                        <button className="d-block mx-auto btn btn-danger" onClick={() => deleteRow(index)}>Delete</button>
                                    ) : (
                                        <button className="d-block mx-auto btn btn-warning" onClick={() => alert("Enable edit to use delete")}>Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="13">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="11" className='text-end'><strong>Grand Total</strong></td>
                        <td><strong>{courses.length > 0 ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            {isEditable && (
                <div className="text-center">
                    <button className="btn btn-primary" onClick={addNewRow}>Add Row</button>
                </div>
            )}
        </div>
    );
};

export default CoursesTable;
