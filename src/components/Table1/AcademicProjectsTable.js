import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const AcademicProjectsTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].projectsData.length + 1).toString(),
            sNo: user[0].projectsData.length + 1,
            course: "",
            projectType: "",
            numberOfBatchesOrStudents: 0,
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].projectsData = [...updatedUser[0].projectsData, newRow];
        updateUser(updatedUser);
    };

    const updateProjectData = (index, field, newValue) => {
        const updatedData = [...user[0].projectsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].projectsData = updatedData;
        updatedUser[0].projectsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].projectsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, project) => total + parseFloat(project.score), 0);
        const updatedUser = [...user];
        updatedUser[0].projectsData = updatedData;
        updatedUser[0].projectsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].projectsData.reduce((total, project) => total + parseFloat(project.score), 0);
    };

    return (
        <div>
       
             <h3>1.3 Academic Projects Guided 	<span className='text-end '>Max. Score: 20</span><br></br>
            </h3>
            <p>(B.Tech - Mini Projects Guided: Score - 2 for each batch, B.Tech- Major Projects Guided: Score - 5 for each batch
M.Tech- Mini Projects Guided: Score - 3 for each student, M.Tech- Major Projects Guided: Score - 5 for each student)
</p>
            
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Course (B.Tech/M.Tech)</th>
                        <th>Type of Project (Mini Project / Major Project)</th>
                        <th>Number of Batches / Students</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].projectsData && user[0].projectsData.length > 0 ? (
                        user[0].projectsData.map((project, index) => (
                            <tr key={project.id}>
                                <Row
                                    value={project.course}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateProjectData(index, 'course', newValue)}
                                />
                                <Row
                                    value={project.projectType}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateProjectData(index, 'projectType', newValue)}
                                />
                                <Row
                                    value={project.numberOfBatchesOrStudents}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateProjectData(index, 'numberOfBatchesOrStudents', newValue)}
                                />
                                <Row
                                    value={project.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateProjectData(index, 'score', newValue)}
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
                            <td colSpan="5">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="3" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].projectsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default AcademicProjectsTable;
