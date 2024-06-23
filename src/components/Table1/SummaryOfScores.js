import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const SummaryOfScores = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const updateSummaryData = (index, field, newValue) => {
        const updatedData = [...user[0].summaryData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const updatedUser = [...user];
        updatedUser[0].summaryData = updatedData;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].summaryData.reduce((total, item) => total + parseFloat(item.selfAppraisal), 0);
    };

    return (
        <div>
            <h2>Summary of Scores:</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Max Score</th>
                        <th>Self-Appraisal</th>
                        <th>HOD Assessment</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].summaryData && user[0].summaryData.length > 0 ? (
                        user[0].summaryData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.category}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateSummaryData(index, 'category', newValue)}
                                />
                                <Row
                                    value={item.maxScore}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateSummaryData(index, 'maxScore', newValue)}
                                />
                                <Row
                                    value={item.selfAppraisal}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateSummaryData(index, 'selfAppraisal', newValue)}
                                />
                                <Row
                                    value={item.hodAssessment}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateSummaryData(index, 'hodAssessment', newValue)}
                                />
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="3" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].summaryData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SummaryOfScores;
