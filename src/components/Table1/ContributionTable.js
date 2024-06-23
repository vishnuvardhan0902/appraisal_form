import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const ContributionTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].contributionData.length + 1).toString(),
            sNo: user[0].contributionData.length + 1,
            responsibility: "",
            institute: "",
            work: "",
            period: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].contributionData = [...updatedUser[0].contributionData, newRow];
        updateUser(updatedUser);
    };

    const updateContributionData = (index, field, newValue) => {
        const updatedData = [...user[0].contributionData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].contributionData = updatedData;
        updatedUser[0].contributionTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].contributionData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].contributionData = updatedData;
        updatedUser[0].contributionTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].contributionData.reduce((total, item) => total + parseFloat(item.score), 0);
    };

    return (
        <div>
            <h3>4.1 Details of Contribution to Corporate life and Management of the Department and Institution through participation in Academic and Administrative committees and responsibilities.</h3>
            <p>(Score for each Institute / Department activity -10)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Academic / Administrative Responsibility</th>
                        <th>Institute / Department</th>
                        <th>Work involved</th>
                        <th>Period</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].contributionData && user[0].contributionData.length > 0 ? (
                        user[0].contributionData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.responsibility}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateContributionData(index, 'responsibility', newValue)}
                                />
                                <Row
                                    value={item.institute}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateContributionData(index, 'institute', newValue)}
                                />
                                <Row
                                    value={item.work}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateContributionData(index, 'work', newValue)}
                                />
                                <Row
                                    value={item.period}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateContributionData(index, 'period', newValue)}
                                />
                                <Row
                                    value={item.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateContributionData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].contributionData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default ContributionTable;
