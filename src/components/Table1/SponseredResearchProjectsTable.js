import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const SponsoredResearchProjectsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].researchProjectsData.length + 1).toString(),
            sNo: user[0].researchProjectsData.length + 1,
            titleOfProject: "",
            fundingAgency: "",
            amount: "",
            investigator: "",
            status: "",
            projectDuration: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].researchProjectsData = [...updatedUser[0].researchProjectsData, newRow];
        updateUser(updatedUser);
    };

    const updateResearchProjectsData = (index, field, newValue) => {
        const updatedData = [...user[0].researchProjectsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].researchProjectsData = updatedData;
        updatedUser[0].researchProjectsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].researchProjectsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].researchProjectsData = updatedData;
        updatedUser[0].researchProjectsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].researchProjectsData.reduce((total, project) => total + parseFloat(project.score), 0);
    };

    return (
        <div>
            <h3>2.5 Sponsored Research Projects</h3>
            <p>(Score for Ongoing Projects - 20, Applied Projects - 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title of the Project</th>
                        <th>Funding agency</th>
                        <th>Amount</th>
                        <th>Whether Principal Investigator/Co-investigator</th>
                        <th>Status (Ongoing/Completed/Applied)</th>
                        <th>Project Duration & Period (For Ongoing/Completed Projects) Date of Application (For Applied Projects)</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].researchProjectsData && user[0].researchProjectsData.length > 0 ? (
                        user[0].researchProjectsData.map((project, index) => (
                            <tr key={project.id}>
                                <Row
                                    value={project.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={project.titleOfProject}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchProjectsData(index, 'titleOfProject', newValue)}
                                />
                                <Row
                                    value={project.fundingAgency}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchProjectsData(index, 'fundingAgency', newValue)}
                                />
                                <Row
                                    value={project.amount}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchProjectsData(index, 'amount', newValue)}
                                />
                                <Row
                                    value={project.investigator}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchProjectsData(index, 'investigator', newValue)}
                                />
                                <Row
                                    value={project.status}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchProjectsData(index, 'status', newValue)}
                                />
                                <Row
                                    value={project.projectDuration}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateResearchProjectsData(index, 'projectDuration', newValue)}
                                />
                                <Row
                                    value={project.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateResearchProjectsData(index, 'score', newValue)}
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
                            <td colSpan="9">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="7" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].researchProjectsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default SponsoredResearchProjectsTable;
