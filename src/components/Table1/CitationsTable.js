import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const CitationsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].citationsData.length + 1).toString(),
            sNo: user[0].citationsData.length + 1,
            publicationsTillDate: 0,
            publicationsWithCitations: 0,
            totalCitations: 0,
            hIndex: 0,
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].citationsData = [...updatedUser[0].citationsData, newRow];
        updateUser(updatedUser);
    };

    const updateCitationsData = (index, field, newValue) => {
        const updatedData = [...user[0].citationsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, citation) => total + parseFloat(citation.score), 0);
        const updatedUser = [...user];
        updatedUser[0].citationsData = updatedData;
        updatedUser[0].citationsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].citationsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, citation) => total + parseFloat(citation.score), 0);
        const updatedUser = [...user];
        updatedUser[0].citationsData = updatedData;
        updatedUser[0].citationsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].citationsData.reduce((total, citation) => total + parseFloat(citation.score), 0);
    };

    return (
        <div>
            <h3>2.2 Citations of Research Publications/Books</h3>
            <p>(Score for Cumulative citations in the range of 3-10 is 2, 11-20 is 5, 21-40 is 8, &gt; 40 is 10)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>No. of Publications / Books till date</th>
                        <th>No. of publications/Books with Citations</th>
                        <th>Total No. of Citations</th>
                        <th>h-Index of the Author</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].citationsData && user[0].citationsData.length > 0 ? (
                        user[0].citationsData.map((citation, index) => (
                            <tr key={citation.id}>
                                <Row
                                    value={citation.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={citation.publicationsTillDate}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'publicationsTillDate', newValue)}
                                />
                                <Row
                                    value={citation.publicationsWithCitations}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'publicationsWithCitations', newValue)}
                                />
                                <Row
                                    value={citation.totalCitations}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'totalCitations', newValue)}
                                />
                                <Row
                                    value={citation.hIndex}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'hIndex', newValue)}
                                />
                                <Row
                                    value={citation.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].citationsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default CitationsTable;
