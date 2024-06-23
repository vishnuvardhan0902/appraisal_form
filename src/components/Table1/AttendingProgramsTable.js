import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const AttendingProgramsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].attendingProgramsData.length + 1).toString(),
            sNo: user[0].attendingProgramsData.length + 1,
            title: "",
            authors: "",
            conferenceDetails: "",
            period: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].attendingProgramsData = [...updatedUser[0].attendingProgramsData, newRow];
        updateUser(updatedUser);
    };

    const updateAttendingProgramsData = (index, field, newValue) => {
        const updatedData = [...user[0].attendingProgramsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, program) => total + parseFloat(program.score), 0);
        const updatedUser = [...user];
        updatedUser[0].attendingProgramsData = updatedData;
        updatedUser[0].attendingProgramsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].attendingProgramsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, program) => total + parseFloat(program.score), 0);
        const updatedUser = [...user];
        updatedUser[0].attendingProgramsData = updatedData;
        updatedUser[0].attendingProgramsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].attendingProgramsData.reduce((total, program) => total + parseFloat(program.score), 0);
    };

    return (
        <div>
            <h3>3.3 Attending Conferences/Seminars/Symposia/Workshops/Webinars</h3>
            <p>(Score for each National/International Conference/Seminar/Symposia - 10)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title of the Paper</th>
                        <th>Names of All Authors</th>
                        <th>Names of the Conference/Seminars/Workshop</th>
                        <th>Period</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].attendingProgramsData && user[0].attendingProgramsData.length > 0 ? (
                        user[0].attendingProgramsData.map((program, index) => (
                            <tr key={program.id}>
                                <Row
                                    value={program.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={program.title}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateAttendingProgramsData(index, 'title', newValue)}
                                />
                                <Row
                                    value={program.authors}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateAttendingProgramsData(index, 'authors', newValue)}
                                />
                                <Row
                                    value={program.conferenceDetails}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateAttendingProgramsData(index, 'conferenceDetails', newValue)}
                                />
                                <Row
                                    value={program.period}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateAttendingProgramsData(index, 'period', newValue)}
                                />
                                <Row
                                    value={program.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateAttendingProgramsData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].attendingProgramsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default AttendingProgramsTable;
