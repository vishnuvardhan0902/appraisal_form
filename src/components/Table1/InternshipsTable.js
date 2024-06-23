import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const InternshipsTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].internshipsData.length + 1).toString(),
            sNo: user[0].internshipsData.length + 1,
            industry: "",
            batchDetails: "",
            details: "",
            period: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].internshipsData = [...updatedUser[0].internshipsData, newRow];
        updateUser(updatedUser);
    };

    const updateInternshipsData = (index, field, newValue) => {
        const updatedData = [...user[0].internshipsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].internshipsData = updatedData;
        updatedUser[0].internshipsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].internshipsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].internshipsData = updatedData;
        updatedUser[0].internshipsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].internshipsData.reduce((total, item) => total + parseFloat(item.score), 0);
    };

    return (
        <div>
            <h3>5.4  Internships arranged for students in Industries/Institutes </h3>
            <p>(Score for each Internship - 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Names of the Industry/Institute</th>
                        <th>Student Batch Details</th>
                        <th>Internship details</th>
                        <th>Period</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].internshipsData && user[0].internshipsData.length > 0 ? (
                        user[0].internshipsData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.industry}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateInternshipsData(index, 'industry', newValue)}
                                />
                                <Row
                                    value={item.batchDetails}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateInternshipsData(index, 'batchDetails', newValue)}
                                />
                                <Row
                                    value={item.details}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateInternshipsData(index, 'details', newValue)}
                                />
                                <Row
                                    value={item.period}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateInternshipsData(index, 'period', newValue)}
                                />
                                <Row
                                    value={item.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateInternshipsData(index, 'score', newValue)}
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
                            <td colSpan="6">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="4" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].internshipsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default InternshipsTable;
