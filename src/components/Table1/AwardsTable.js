import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const AwardsTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].awardsData.length + 1).toString(),
            sNo: user[0].awardsData.length + 1,
            award: "",
            organization: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].awardsData = [...updatedUser[0].awardsData, newRow];
        updateUser(updatedUser);
    };

    const updateAwardsData = (index, field, newValue) => {
        const updatedData = [...user[0].awardsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].awardsData = updatedData;
        updatedUser[0].awardsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].awardsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].awardsData = updatedData;
        updatedUser[0].awardsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].awardsData.reduce((total, item) => total + parseFloat(item.score), 0);
    };

    return (
        <div>
            <h3>5.2	Details of Awards/ Rewards and Honors</h3>
            <p>(Score for each Award/ Honor - 10)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Type of Award</th>
                        <th>Organization</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].awardsData && user[0].awardsData.length > 0 ? (
                        user[0].awardsData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.award}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateAwardsData(index, 'award', newValue)}
                                />
                                <Row
                                    value={item.organization}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateAwardsData(index, 'organization', newValue)}
                                />
                                <Row
                                    value={item.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateAwardsData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].awardsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default AwardsTable;
