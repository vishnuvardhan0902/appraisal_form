import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const StudentActivitiesTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].studentActivitiesData.length + 1).toString(),
            sNo: user[0].studentActivitiesData.length + 1,
            activity: "",
            period: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].studentActivitiesData = [...updatedUser[0].studentActivitiesData, newRow];
        updateUser(updatedUser);
    };

    const updateStudentActivitiesData = (index, field, newValue) => {
        const updatedData = [...user[0].studentActivitiesData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].studentActivitiesData = updatedData;
        updatedUser[0].studentActivitiesTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].studentActivitiesData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].studentActivitiesData = updatedData;
        updatedUser[0].studentActivitiesTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].studentActivitiesData.reduce((total, item) => total + parseFloat(item.score), 0);
    };

    return (
        <div>
            <h3>4.2	Details of Student related Co-Curricular, Extra Curricular, Extension and field based Activities</h3>
            <p>(Score for each Co-Curricular / Extra Curricular / Mentoring/ Entrepreneurship/ Innovation Activity etc., – 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Extension activities participated</th>
                        <th>Period</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].studentActivitiesData && user[0].studentActivitiesData.length > 0 ? (
                        user[0].studentActivitiesData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.activity}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateStudentActivitiesData(index, 'activity', newValue)}
                                />
                                <Row
                                    value={item.period}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateStudentActivitiesData(index, 'period', newValue)}
                                />
                                <Row
                                    value={item.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateStudentActivitiesData(index, 'score', newValue)}
                                />
                                <td>
                                    {isEditable ? (
                                        <button className="d-block mx-auto btn btn-danger" onClick={() => deleteRow(index)}>Delete</button>
                                    ) : (
                                        <button className="d-block mx-auto btn btn-warning" onClick={() => alert("enable edit to use delete")}>Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="2" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].studentActivitiesData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default StudentActivitiesTable;
