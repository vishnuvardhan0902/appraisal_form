import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const ConsultancyProjectsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].consultancyProjectsData.length + 1).toString(),
            sNo: user[0].consultancyProjectsData.length + 1,
            nameOfConsultancyProject: "",
            consultingAgency: "",
            amount: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].consultancyProjectsData = [...updatedUser[0].consultancyProjectsData, newRow];
        updateUser(updatedUser);
    };

    const updateConsultancyProjectsData = (index, field, newValue) => {
        const updatedData = [...user[0].consultancyProjectsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].consultancyProjectsData = updatedData;
        updatedUser[0].consultancyProjectsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].consultancyProjectsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].consultancyProjectsData = updatedData;
        updatedUser[0].consultancyProjectsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].consultancyProjectsData.reduce((total, project) => total + parseFloat(project.score), 0);
    };

    return (
        <div>
            <h3>2.6 Consultancy Projects</h3>
            <p>(Score for each Consultancy Project - 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name of Consultancy Project</th>
                        <th>Consulting / Sponsoring Agency</th>
                        <th>Amount</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].consultancyProjectsData && user[0].consultancyProjectsData.length > 0 ? (
                        user[0].consultancyProjectsData.map((project, index) => (
                            <tr key={project.id}>
                                <Row
                                    value={project.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={project.nameOfConsultancyProject}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateConsultancyProjectsData(index, 'nameOfConsultancyProject', newValue)}
                                />
                                <Row
                                    value={project.consultingAgency}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateConsultancyProjectsData(index, 'consultingAgency', newValue)}
                                />
                                <Row
                                    value={project.amount}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateConsultancyProjectsData(index, 'amount', newValue)}
                                />
                                <Row
                                    value={project.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateConsultancyProjectsData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].consultancyProjectsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default ConsultancyProjectsTable;
