import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';
import 'bootstrap/dist/css/bootstrap.min.css';

const AcademicProjectsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/academic-projects')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setProjectsData(data || []); // Ensure an empty array is set if there is no data
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching academic projects:', error);
                setLoading(false);
            });
    }, []);

    const addNewRow = () => {
        const newRow = {
            id: projectsData.length + 1,
            sNo: projectsData.length + 1,
            course: "",
            projectType: "",
            numberOfBatchesOrStudents: 0,
            score: 0
        };
        const updatedProjectsData = [...projectsData, newRow];
        setProjectsData(updatedProjectsData);
        updateProjectsDataOnServer(updatedProjectsData);
    };

    const updateProjectData = (index, field, newValue) => {
        const updatedProjectsData = [...projectsData];
        updatedProjectsData[index] = { ...updatedProjectsData[index], [field]: newValue };
        setProjectsData(updatedProjectsData);
        updateProjectsDataOnServer(updatedProjectsData);
    };

    const deleteRow = (index) => {
        const updatedProjectsData = [...projectsData];
        updatedProjectsData.splice(index, 1);
        setProjectsData(updatedProjectsData);
        updateProjectsDataOnServer(updatedProjectsData);
    };

    const updateProjectsDataOnServer = (data) => {
        fetch('/api/academic-projects', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Updated data from server:', data); // Log server response
            updateUser(data);
        })
        .catch((error) => {
            console.error('Error updating academic projects data:', error);
        });
    };

    const getGrandTotal = () => {
        return projectsData.reduce((total, project) => total + parseFloat(project.score), 0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>1.3 Academic Projects Guided  <span className='text-end'>Max. Score: 20</span><br /></h3>
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
                    {projectsData.length > 0 ? (
                        projectsData.map((project, index) => (
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
                                        <button className="d-block mx-auto btn btn-warning" onClick={() => alert("Enable edit to use delete")}>Delete</button>
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
                        <td><strong>{getGrandTotal()}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default AcademicProjectsTable;
