import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const TrainingProgrammesTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].trainingProgrammesData.length + 1).toString(),
            sNo: user[0].trainingProgrammesData.length + 1,
            name: "",
            period: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].trainingProgrammesData = [...updatedUser[0].trainingProgrammesData, newRow];
        updateUser(updatedUser);
    };

    const updateTrainingProgrammesData = (index, field, newValue) => {
        const updatedData = [...user[0].trainingProgrammesData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, programme) => total + parseFloat(programme.score), 0);
        const updatedUser = [...user];
        updatedUser[0].trainingProgrammesData = updatedData;
        updatedUser[0].trainingProgrammesTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].trainingProgrammesData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, programme) => total + parseFloat(programme.score), 0);
        const updatedUser = [...user];
        updatedUser[0].trainingProgrammesData = updatedData;
        updatedUser[0].trainingProgrammesTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].trainingProgrammesData.reduce((total, programme) => total + parseFloat(programme.score), 0);
    };

    return (
        <div>
            <h3>3.5 Details of Training Programmes Attended</h3>
            <p>(Score for FDP/STTP/ATAL/Training Programme/NPTEL Course/etc. - Score is 10 for Duration ≥ 5 days and 5 for duration  5 days)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name of the programme</th>
                        <th>Period</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].trainingProgrammesData && user[0].trainingProgrammesData.length > 0 ? (
                        user[0].trainingProgrammesData.map((programme, index) => (
                            <tr key={programme.id}>
                                <Row
                                    value={programme.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={programme.name}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateTrainingProgrammesData(index, 'name', newValue)}
                                />
                                <Row
                                    value={programme.period}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateTrainingProgrammesData(index, 'period', newValue)}
                                />
                                <Row
                                    value={programme.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateTrainingProgrammesData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].trainingProgrammesData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default TrainingProgrammesTable;
