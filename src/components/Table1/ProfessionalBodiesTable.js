import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const ProfessionalBodiesTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].professionalBodiesData.length + 1).toString(),
            sNo: user[0].professionalBodiesData.length + 1,
            association: "",
            status: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].professionalBodiesData = [...updatedUser[0].professionalBodiesData, newRow];
        updateUser(updatedUser);
    };

    const updateProfessionalBodiesData = (index, field, newValue) => {
        const updatedData = [...user[0].professionalBodiesData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].professionalBodiesData = updatedData;
        updatedUser[0].professionalBodiesTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].professionalBodiesData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].professionalBodiesData = updatedData;
        updatedUser[0].professionalBodiesTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].professionalBodiesData.reduce((total, item) => total + parseFloat(item.score), 0);
    };

    return (
        <div>
            <h3>5.1 Membership in Professional Bodies</h3>
            <p>(Score for National membership - 5 / International membership - 10/ National Executive - 10)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Name of the association/organization</th>
                        <th>Status</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].professionalBodiesData && user[0].professionalBodiesData.length > 0 ? (
                        user[0].professionalBodiesData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.association}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateProfessionalBodiesData(index, 'association', newValue)}
                                />
                                <Row
                                    value={item.status}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateProfessionalBodiesData(index, 'status', newValue)}
                                />
                                <Row
                                    value={item.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateProfessionalBodiesData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].professionalBodiesData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default ProfessionalBodiesTable;
