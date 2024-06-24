import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';
const LecturesTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].newTableData.length + 1).toString(),
            sNo: user[0].newTableData.length + 1,
            courseName: "",
            techYearSemester: "",
            novelMethodsDetails: "",
            novelMethodsScore: 0,
            teachingPeriodsPlanned: 0,
            teachingPeriodsConducted: 0,
            classesEngaged: 0,
            totalScore: 0
        };
        const updatedUser = [...user];
        updatedUser[0].newTableData = [...updatedUser[0].newTableData, newRow];
        updateUser(updatedUser);
    };

    const updateLectureData = (index, field, newValue) => {
        const updatedData = [...user[0].newTableData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, lecture) => total + parseFloat(lecture.totalScore), 0);
        const updatedUser = [...user];
        updatedUser[0].newTableData = updatedData;
        updatedUser[0].newTableTotalScore = newTotalScore;
        updatedUser[0].newTableGrandTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].newTableData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, lecture) => total + parseFloat(lecture.totalScore), 0);
        const updatedUser = [...user];
        updatedUser[0].newTableData = updatedData;
        updatedUser[0].newTableTotalScore = newTotalScore;
        updatedUser[0].newTableGrandTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].newTableData.reduce((total, lecture) => total + parseFloat(lecture.totalScore), 0);
    };

    return (
        <div>
             <h2>CATEGORY1:   TEACHING, LEARNING & EVALUATION    			<span className='text-end '>Max. Score: 150</span></h2>
        
             <h3>1.1	Lectures, Practical, Contact hours (Semester-wise) 					Max. Score=50 <br></br>
                </h3>
            <p>(For each course score –10 for 96-100% engagement, <br></br>
                8 for 90 to 95% engagement, <br></br>
                6 for 80 to 89% engagement,<br></br>
                Score-5 for each course for the novel pedagogical methods used (at least to an extent of 25%))<br></br>
            </p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Course Name</th>
                        <th>Tech Year Semester</th>
                        <th>Novel Methods Details</th>
                        <th>Novel Methods Score</th>
                        <th>Teaching Periods Planned</th>
                        <th>Teaching Periods Conducted</th>
                        <th>Classes Engaged</th>
                        <th>Total Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].newTableData && user[0].newTableData.length > 0 ? (
                        user[0].newTableData.map((lecture, index) => (
                            <tr key={lecture.id}>
                                <td>{lecture.sNo}</td>
                                <Row
                                    value={lecture.courseName}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateLectureData(index, 'courseName', newValue)}
                                />
                                <Row
                                    value={lecture.techYearSemester}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateLectureData(index, 'techYearSemester', newValue)}
                                />
                                <Row
                                    value={lecture.novelMethodsDetails}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateLectureData(index, 'novelMethodsDetails', newValue)}
                                />
                                <Row
                                    value={lecture.novelMethodsScore}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateLectureData(index, 'novelMethodsScore', newValue)}
                                />
                                <Row
                                    value={lecture.teachingPeriodsPlanned}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateLectureData(index, 'teachingPeriodsPlanned', newValue)}
                                />
                                <Row
                                    value={lecture.teachingPeriodsConducted}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateLectureData(index, 'teachingPeriodsConducted', newValue)}
                                />
                                <Row
                                    value={lecture.classesEngaged}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateLectureData(index, 'classesEngaged', newValue)}
                                />
                                <Row
                                    value={lecture.totalScore}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateLectureData(index, 'totalScore', newValue)}
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
                            <td colSpan="10">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="8" className='text-end'><strong>Grand Total</strong></td>
                        <td><strong>{user[0] && user[0].newTableData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>

        </div>
    );
};

export default LecturesTable;
