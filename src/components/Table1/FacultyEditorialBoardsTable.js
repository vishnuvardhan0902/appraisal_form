import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const FacultyEditorialBoardsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].facultyEditorialBoardsData.length + 1).toString(),
            sNo: user[0].facultyEditorialBoardsData.length + 1,
            natureOfContribution: "",
            associatedOrganization: "",
            nationalInternational: "",
            dateDuration: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].facultyEditorialBoardsData = [...updatedUser[0].facultyEditorialBoardsData, newRow];
        updateUser(updatedUser);
    };

    const updateFacultyEditorialBoardsData = (index, field, newValue) => {
        const updatedData = [...user[0].facultyEditorialBoardsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, contribution) => total + parseFloat(contribution.score), 0);
        const updatedUser = [...user];
        updatedUser[0].facultyEditorialBoardsData = updatedData;
        updatedUser[0].facultyEditorialBoardsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].facultyEditorialBoardsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, contribution) => total + parseFloat(contribution.score), 0);
        const updatedUser = [...user];
        updatedUser[0].facultyEditorialBoardsData = updatedData;
        updatedUser[0].facultyEditorialBoardsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].facultyEditorialBoardsData.reduce((total, contribution) => total + parseFloat(contribution.score), 0);
    };

    return (
        <div>
            <h3>3.4b Faculty on Editorial Boards</h3>
            <p>(Score for Faculty on editorial boards of National/International journals, organization committees of National/International Conferences and reviewer for Journal and Conferences etc. – 10 each)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Nature of Contribution</th>
                        <th>Details of associated Organization/Journal/Conference etc.</th>
                        <th>National/International</th>
                        <th>Date/Duration</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].facultyEditorialBoardsData && user[0].facultyEditorialBoardsData.length > 0 ? (
                        user[0].facultyEditorialBoardsData.map((contribution, index) => (
                            <tr key={contribution.id}>
                                <Row
                                    value={contribution.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={contribution.natureOfContribution}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyEditorialBoardsData(index, 'natureOfContribution', newValue)}
                                />
                                <Row
                                    value={contribution.associatedOrganization}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyEditorialBoardsData(index, 'associatedOrganization', newValue)}
                                />
                                <Row
                                    value={contribution.nationalInternational}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyEditorialBoardsData(index, 'nationalInternational', newValue)}
                                />
                                <Row
                                    value={contribution.dateDuration}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyEditorialBoardsData(index, 'dateDuration', newValue)}
                                />
                                <Row
                                    value={contribution.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateFacultyEditorialBoardsData(index, 'score', newValue)}
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
                            <td colSpan="7">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="5" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].facultyEditorialBoardsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default FacultyEditorialBoardsTable;
