import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const ResearchGuidanceTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].researchGuidanceData.length + 1).toString(),
            sNo: user[0].researchGuidanceData.length + 1,
            nameOfStudent: "",
            university: "",
            titleOfThesis: "",
            guideCoGuide: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].researchGuidanceData = [...updatedUser[0].researchGuidanceData, newRow];
        updateUser(updatedUser);
    };

    const updateResearchGuidanceData = (index, field, newValue) => {
        const updatedData = [...user[0].researchGuidanceData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].researchGuidanceData = updatedData;
        updatedUser[0].researchGuidanceTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].researchGuidanceData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].researchGuidanceData = updatedData;
        updatedUser[0].researchGuidanceTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].researchGuidanceData.reduce((total, project) => total + parseFloat(project.score), 0);
    };

    return (
        <div>
            <h3>2.7 Research Guidance</h3>
            <p>(Score for Ph. D. Guide - 10, Co - Guide - 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name of the Student</th>
                        <th>University</th>
                        <th>Title of the Thesis</th>
                        <th>Whether Guide/Co-Guide</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].researchGuidanceData && user[0].researchGuidanceData.length > 0 ? (
                        user[0].researchGuidanceData.map((project, index) => (
                            <tr key={project.id}>
                                <Row
                                    value={project.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={project.nameOfStudent}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchGuidanceData(index, 'nameOfStudent', newValue)}
                                />
                                <Row
                                    value={project.university}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchGuidanceData(index, 'university', newValue)}
                                />
                                <Row
                                    value={project.titleOfThesis}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchGuidanceData(index, 'titleOfThesis', newValue)}
                                />
                                <Row
                                    value={project.guideCoGuide}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchGuidanceData(index, 'guideCoGuide', newValue)}
                                />
                                <Row
                                    value={project.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateResearchGuidanceData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].researchGuidanceData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default ResearchGuidanceTable;
