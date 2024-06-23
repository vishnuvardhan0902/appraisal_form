import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const PatentsTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].patentsData.length + 1).toString(),
            sNo: user[0].patentsData.length + 1,
            titleOfPatent: "",
            country: "",
            institute: "",
            fileNumber: "",
            status: "",
            dateOfApplication: "",
            dateOfPublication: "",
            dateOfGrant: "",
            validDuration: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].patentsData = [...updatedUser[0].patentsData, newRow];
        updateUser(updatedUser);
    };

    const updatePatentsData = (index, field, newValue) => {
        const updatedData = [...user[0].patentsData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, patent) => total + parseFloat(patent.score), 0);
        const updatedUser = [...user];
        updatedUser[0].patentsData = updatedData;
        updatedUser[0].patentsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].patentsData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, patent) => total + parseFloat(patent.score), 0);
        const updatedUser = [...user];
        updatedUser[0].patentsData = updatedData;
        updatedUser[0].patentsTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].patentsData.reduce((total, patent) => total + parseFloat(patent.score), 0);
    };

    return (
        <div>
            <h3>2.4 Patents / Transfer of Technology / Trade Marks / Copy Rights / Any Other Intellectual Property Rights</h3>
            <p>(Score for Granted/Published - 10, Applied - 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title of the Patent / Design/etc.</th>
                        <th>Country</th>
                        <th>Institute</th>
                        <th>File Number</th>
                        <th>Status</th>
                        <th>Date of Application</th>
                        <th>Date of Publication</th>
                        <th>Date of Grant</th>
                        <th>Valid Duration</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].patentsData && user[0].patentsData.length > 0 ? (
                        user[0].patentsData.map((patent, index) => (
                            <tr key={patent.id}>
                                <Row
                                    value={patent.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={patent.titleOfPatent}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePatentsData(index, 'titleOfPatent', newValue)}
                                />
                                <Row
                                    value={patent.country}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePatentsData(index, 'country', newValue)}
                                />
                                <Row
                                    value={patent.institute}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePatentsData(index, 'institute', newValue)}
                                />
                                <Row
                                    value={patent.fileNumber}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePatentsData(index, 'fileNumber', newValue)}
                                />
                                <Row
                                    value={patent.status}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePatentsData(index, 'status', newValue)}
                                />
                                <Row
                                    value={patent.dateOfApplication}
                                    isEditable={isEditable}
                                    type="date"
                                    setValue={(newValue) => updatePatentsData(index, 'dateOfApplication', newValue)}
                                />
                                <Row
                                    value={patent.dateOfPublication}
                                    isEditable={isEditable}
                                    type="date"
                                    setValue={(newValue) => updatePatentsData(index, 'dateOfPublication', newValue)}
                                />
                                <Row
                                    value={patent.dateOfGrant}
                                    isEditable={isEditable}
                                    type="date"
                                    setValue={(newValue) => updatePatentsData(index, 'dateOfGrant', newValue)}
                                />
                                <Row
                                    value={patent.validDuration}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePatentsData(index, 'validDuration', newValue)}
                                />
                                <Row
                                    value={patent.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updatePatentsData(index, 'score', newValue)}
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
                            <td colSpan="12">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="10" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].patentsData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default PatentsTable;
