import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const NationalInternationalTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].nationalInternationalData.length + 1).toString(),
            sNo: user[0].nationalInternationalData.length + 1,
            nameOfInstitute: "",
            contactDetails: "",
            outcome: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].nationalInternationalData = [...updatedUser[0].nationalInternationalData, newRow];
        updateUser(updatedUser);
    };

    const updateNationalInternationalData = (index, field, newValue) => {
        const updatedData = [...user[0].nationalInternationalData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, institute) => total + parseFloat(institute.score), 0);
        const updatedUser = [...user];
        updatedUser[0].nationalInternationalData = updatedData;
        updatedUser[0].nationalInternationalTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].nationalInternationalData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, institute) => total + parseFloat(institute.score), 0);
        const updatedUser = [...user];
        updatedUser[0].nationalInternationalData = updatedData;
        updatedUser[0].nationalInternationalTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].nationalInternationalData.reduce((total, institute) => total + parseFloat(institute.score), 0);
    };

    return (
        <div>
            <h3>2.9 Interaction/Association with National/International reputed Institutes/Higher Learning Organizations</h3>
            <p>(Outcome –maybe joint Paper / Project /sharing of research facilities / Student Internships/ Student Projects etc– Score is 5 for each linkage)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name of the Institute</th>
                        <th>Name, Designation and Contact Details of the Associated Person</th>
                        <th>Outcome</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].nationalInternationalData && user[0].nationalInternationalData.length > 0 ? (
                        user[0].nationalInternationalData.map((institute, index) => (
                            <tr key={institute.id}>
                                <Row
                                    value={institute.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={institute.nameOfInstitute}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateNationalInternationalData(index, 'nameOfInstitute', newValue)}
                                />
                                <Row
                                    value={institute.contactDetails}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateNationalInternationalData(index, 'contactDetails', newValue)}
                                />
                                <Row
                                    value={institute.outcome}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateNationalInternationalData(index, 'outcome', newValue)}
                                />
                                <Row
                                    value={institute.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateNationalInternationalData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].nationalInternationalData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default NationalInternationalTable;
