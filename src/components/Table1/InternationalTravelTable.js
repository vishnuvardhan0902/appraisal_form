import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const InternationalTravelTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].internationalTravelData.length + 1).toString(),
            sNo: user[0].internationalTravelData.length + 1,
            purpose: "",
            place: "",
            outcome: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].internationalTravelData = [...updatedUser[0].internationalTravelData, newRow];
        updateUser(updatedUser);
    };

    const updateInternationalTravelData = (index, field, newValue) => {
        const updatedData = [...user[0].internationalTravelData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, travel) => total + parseFloat(travel.score), 0);
        const updatedUser = [...user];
        updatedUser[0].internationalTravelData = updatedData;
        updatedUser[0].internationalTravelTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].internationalTravelData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, travel) => total + parseFloat(travel.score), 0);
        const updatedUser = [...user];
        updatedUser[0].internationalTravelData = updatedData;
        updatedUser[0].internationalTravelTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].internationalTravelData.reduce((total, travel) => total + parseFloat(travel.score), 0);
    };

    return (
        <div>
            <h3>3.6 International Travel/Exposure</h3>
            <p>(Score for each exposure is 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Purpose of Travel</th>
                        <th>Place of visit/University</th>
                        <th>Outcome</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].internationalTravelData && user[0].internationalTravelData.length > 0 ? (
                        user[0].internationalTravelData.map((travel, index) => (
                            <tr key={travel.id}>
                                <Row
                                    value={travel.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={travel.purpose}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateInternationalTravelData(index, 'purpose', newValue)}
                                />
                                <Row
                                    value={travel.place}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateInternationalTravelData(index, 'place', newValue)}
                                />
                                <Row
                                    value={travel.outcome}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateInternationalTravelData(index, 'outcome', newValue)}
                                />
                                <Row
                                    value={travel.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateInternationalTravelData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].internationalTravelData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default InternationalTravelTable;
