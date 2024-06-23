import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const FacultyResourcePersonsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].facultyResourcePersonsData.length + 1).toString(),
            sNo: user[0].facultyResourcePersonsData.length + 1,
            typeOfProgram: "",
            nameOfProgram: "",
            lectureTopic: "",
            duration: "",
            venue: "",
            organizedBy: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].facultyResourcePersonsData = [...updatedUser[0].facultyResourcePersonsData, newRow];
        updateUser(updatedUser);
    };

    const updateFacultyResourcePersonsData = (index, field, newValue) => {
        const updatedData = [...user[0].facultyResourcePersonsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, program) => total + parseFloat(program.score), 0);
        const updatedUser = [...user];
        updatedUser[0].facultyResourcePersonsData = updatedData;
        updatedUser[0].facultyResourcePersonsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].facultyResourcePersonsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, program) => total + parseFloat(program.score), 0);
        const updatedUser = [...user];
        updatedUser[0].facultyResourcePersonsData = updatedData;
        updatedUser[0].facultyResourcePersonsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].facultyResourcePersonsData.reduce((total, program) => total + parseFloat(program.score), 0);
    };

    return (
        <div>
            <h3>3.4 Faculty as Resource Persons</h3>
            <p>(Score for Resource Person in Conferences/FDPs/Workshops/Short term course/Training Programs/Guest Lectures/Webinars etc. - 10 each)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Type of the program</th>
                        <th>Name of the program</th>
                        <th>Lecture Topic</th>
                        <th>Duration</th>
                        <th>Venue</th>
                        <th>Organized by</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].facultyResourcePersonsData && user[0].facultyResourcePersonsData.length > 0 ? (
                        user[0].facultyResourcePersonsData.map((program, index) => (
                            <tr key={program.id}>
                                <Row
                                    value={program.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={program.typeOfProgram}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyResourcePersonsData(index, 'typeOfProgram', newValue)}
                                />
                                <Row
                                    value={program.nameOfProgram}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyResourcePersonsData(index, 'nameOfProgram', newValue)}
                                />
                                <Row
                                    value={program.lectureTopic}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyResourcePersonsData(index, 'lectureTopic', newValue)}
                                />
                                <Row
                                    value={program.duration}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyResourcePersonsData(index, 'duration', newValue)}
                                />
                                <Row
                                    value={program.venue}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyResourcePersonsData(index, 'venue', newValue)}
                                />
                                <Row
                                    value={program.organizedBy}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateFacultyResourcePersonsData(index, 'organizedBy', newValue)}
                                />
                                <Row
                                    value={program.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateFacultyResourcePersonsData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].facultyResourcePersonsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default FacultyResourcePersonsTable;
