import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const ResearchInterestGroupsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].researchInterestGroupsData.length + 1).toString(),
            sNo: user[0].researchInterestGroupsData.length + 1,
            nameOfInterestGroup: "",
            sizeOfGroup: "",
            outcome: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].researchInterestGroupsData = [...updatedUser[0].researchInterestGroupsData, newRow];
        updateUser(updatedUser);
    };

    const updateResearchInterestGroupsData = (index, field, newValue) => {
        const updatedData = [...user[0].researchInterestGroupsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, group) => total + parseFloat(group.score), 0);
        const updatedUser = [...user];
        updatedUser[0].researchInterestGroupsData = updatedData;
        updatedUser[0].researchInterestGroupsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].researchInterestGroupsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, group) => total + parseFloat(group.score), 0);
        const updatedUser = [...user];
        updatedUser[0].researchInterestGroupsData = updatedData;
        updatedUser[0].researchInterestGroupsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].researchInterestGroupsData.reduce((total, group) => total + parseFloat(group.score), 0);
    };

    return (
        <div>
            <h3>2.8 Research Interest Groups</h3>
            <p>(Specify area of work and outcomes, score for Research Interest Group participation with tangible outcomes - 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name of interest Group</th>
                        <th>Size of the Group</th>
                        <th>Outcome</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].researchInterestGroupsData && user[0].researchInterestGroupsData.length > 0 ? (
                        user[0].researchInterestGroupsData.map((group, index) => (
                            <tr key={group.id}>
                                <Row
                                    value={group.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={group.nameOfInterestGroup}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchInterestGroupsData(index, 'nameOfInterestGroup', newValue)}
                                />
                                <Row
                                    value={group.sizeOfGroup}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchInterestGroupsData(index, 'sizeOfGroup', newValue)}
                                />
                                <Row
                                    value={group.outcome}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchInterestGroupsData(index, 'outcome', newValue)}
                                />
                                <Row
                                    value={group.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateResearchInterestGroupsData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].researchInterestGroupsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default ResearchInterestGroupsTable;
