import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const CoursesTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const updateCourseData = (index, field, newValue) => {
        const updatedData = [...user[0].secondTableData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const updatedUser = [...user];
        updatedUser[0].secondTableData = updatedData;
        updatedUser[0].secondTableTotalScore = updatedData.reduce((total, course) => total + parseFloat(course.totalScore), 0);
        updatedUser[0].secondTableGrandTotalScore = updatedUser[0].secondTableTotalScore;
        updateUser(updatedUser);
    };

    const addNewRow = () => {
        const newRow = {
            id: (user[0].secondTableData.length + 1).toString(),
            sNo: user[0].secondTableData.length + 1,
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
        const updatedUser = [...user];
        updatedUser[0].secondTableData = [...updatedUser[0].secondTableData, newRow];
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].secondTableData];
        updatedData.splice(index, 1);
        const updatedUser = [...user];
        updatedUser[0].secondTableData = updatedData;
        updatedUser[0].secondTableTotalScore = updatedData.reduce((total, course) => total + parseFloat(course.totalScore), 0);
        updatedUser[0].secondTableGrandTotalScore = updatedUser[0].secondTableTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].secondTableData.reduce((total, course) => total + parseFloat(course.totalScore), 0);
    };

    return (
        <div>
           
             <h3>1.2	Courses Taught –Attendance, Feedback and Results	<span className='text-end '>Max. Score: 80</span><br></br>
            </h3>
            <p>(For each Course Max. Score=20 - Attendance (A)=5, Feedback (B)=5, Results (C)=10)</p>
            
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
                    {user[0] && user[0].secondTableData && user[0].secondTableData.length > 0 ? (
                        user[0].secondTableData.map((course, index) => (
                            <tr key={course.id}>
                                <td>{course.sNo}</td>
                                <Row
                                    value={course.courseName}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateCourseData(index, 'courseName', newValue)}
                                />
                                <Row
                                    value={course.sizeOfClass}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'sizeOfClass', newValue)}
                                />
                                <Row
                                    value={course.studentsAttendance75}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'studentsAttendance75', newValue)}
                                />
                                <Row
                                    value={course.studentsAttendance6575}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'studentsAttendance6575', newValue)}
                                />
                                <Row
                                    value={course.attendanceScore}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'attendanceScore', newValue)}
                                />
                                <Row
                                    value={course.feedbackReceived}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'feedbackReceived', newValue)}
                                />
                                <Row
                                    value={course.gradeO}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'gradeO', newValue)}
                                />
                                <Row
                                    value={course.gradeAB}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'gradeAB', newValue)}
                                />
                                <Row
                                    value={course.gradeCD}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'gradeCD', newValue)}
                                />
                                <Row
                                    value={course.resultsScore}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'resultsScore', newValue)}
                                />
                                <Row
                                    value={course.totalScore}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCourseData(index, 'totalScore', newValue)}
                                />
                                <td>
                                {     
                                isEditable?( <button className="d-block mx-auto btn btn-danger" onClick={() => deleteRow(index)}>Delete</button>) :(<button className="d-block mx-auto btn btn-warning" onClick={() => alert("enable edit to use delete")}>Delete</button>)                             
                                }                                
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
                        <td><strong>{user[0] && user[0].secondTableData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default CoursesTable;
