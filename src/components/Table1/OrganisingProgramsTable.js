import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const OrganizingProgramsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].organizingProgramsData.length + 1).toString(),
            sNo: user[0].organizingProgramsData.length + 1,
            title: "",
            period: "",
            sponsors: "",
            status: "",
            type: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].organizingProgramsData = [...updatedUser[0].organizingProgramsData, newRow];
        updateUser(updatedUser);
    };

    const updateOrganizingProgramsData = (index, field, newValue) => {
        const updatedData = [...user[0].organizingProgramsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, program) => total + parseFloat(program.score), 0);
        const updatedUser = [...user];
        updatedUser[0].organizingProgramsData = updatedData;
        updatedUser[0].organizingProgramsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].organizingProgramsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, program) => total + parseFloat(program.score), 0);
        const updatedUser = [...user];
        updatedUser[0].organizingProgramsData = updatedData;
        updatedUser[0].organizingProgramsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].organizingProgramsData.reduce((total, program) => total + parseFloat(program.score), 0);
    };

    return (
        <div>
            <h3>3.2 Organizing Seminars/Conferences/Workshops/Training Programs/Webinars</h3>
            <p>(Score for Seminars/Conferences/Workshops/Training Programs etc., is 10 each)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title of the Program</th>
                        <th>Period</th>
                        <th>Sponsors</th>
                        <th>Status</th>
                        <th>National/International</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].organizingProgramsData && user[0].organizingProgramsData.length > 0 ? (
                        user[0].organizingProgramsData.map((program, index) => (
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
                                    setValue={(newValue) => updateOrganizingProgramsData(index, 'title', newValue)}
                                />
                                <Row
                                    value={program.period}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateOrganizingProgramsData(index, 'period', newValue)}
                                />
                                <Row
                                    value={program.sponsors}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateOrganizingProgramsData(index, 'sponsors', newValue)}
                                />
                                <Row
                                    value={program.status}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateOrganizingProgramsData(index, 'status', newValue)}
                                />
                                <Row
                                    value={program.type}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateOrganizingProgramsData(index, 'type', newValue)}
                                />
                                <Row
                                    value={program.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateOrganizingProgramsData(index, 'score', newValue)}
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
                            <td colSpan="8">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="6" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].organizingProgramsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default OrganizingProgramsTable;
