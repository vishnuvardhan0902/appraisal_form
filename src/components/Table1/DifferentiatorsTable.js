import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const DifferentiatorsTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].differentiatorsData.length + 1).toString(),
            sNo: user[0].differentiatorsData.length + 1,
            differentiator: "",
            participation: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].differentiatorsData = [...updatedUser[0].differentiatorsData, newRow];
        updateUser(updatedUser);
    };

    const updateDifferentiatorsData = (index, field, newValue) => {
        const updatedData = [...user[0].differentiatorsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].differentiatorsData = updatedData;
        updatedUser[0].differentiatorsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].differentiatorsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].differentiatorsData = updatedData;
        updatedUser[0].differentiatorsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].differentiatorsData.reduce((total, item) => total + parseFloat(item.score), 0);
    };

    return (
        <div>
            <h3>5.3	Participation / Leading the VNR VJIET differentiators </h3>
            <p>(Score for Participation in each activity - 3, Leading each activity - 7, Initiating and giving a shape to it and executing –10)
</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Differentiator</th>
                        <th>Participation / Leading / Initiating</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].differentiatorsData && user[0].differentiatorsData.length > 0 ? (
                        user[0].differentiatorsData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.differentiator}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateDifferentiatorsData(index, 'differentiator', newValue)}
                                />
                                <Row
                                    value={item.participation}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateDifferentiatorsData(index, 'participation', newValue)}
                                />
                                <Row
                                    value={item.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateDifferentiatorsData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].differentiatorsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default DifferentiatorsTable;
