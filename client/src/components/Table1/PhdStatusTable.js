import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const PhDStatusTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const [phdStatusData, setPhdStatusData] = useState([
        { id: '1', field: 'egistered', label: 'Registered for Ph.D. (5)' },
        { id: '2', field: 'clearedPreExam', label: 'Cleared Pre Ph.D. Exam (5)' },
        { id: '3', field: 'thesisSubmitted', label: 'Thesis Submitted (8)' },
        { id: '4', field: 'awarded', label: 'Awarded (10)' },
    ]);

    const addNewRow = () => {
        const newRow = {
            id: (phdStatusData.length + 1).toString(),
            field: `field${phdStatusData.length + 1}`,
            label: `Label ${phdStatusData.length + 1}`,
        };
        setPhdStatusData([...phdStatusData, newRow]);
    };

    const updatePhDStatus = (field, newValue) => {
        if (!user[0] ||!user[0].phdStatus) {
            user[0].phdStatus = {};
        }
        const updatedUser = [...user];
        updatedUser[0].phdStatus = {...updatedUser[0].phdStatus, [field]: newValue };
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...phdStatusData];
        updatedData.splice(index, 1);
        setPhdStatusData(updatedData);
    };

    const getTotalScore = () => {
        if (!user[0] ||!user[0].phdStatus) {
            return 0;
        }
        const { registered, clearedPreExam, thesisSubmitted, awarded } = user[0].phdStatus;
        return (registered? 5 : 0) + (clearedPreExam? 5 : 0) + (thesisSubmitted? 8 : 0) + (awarded? 10 : 0);
    };

    return (
        <div>
            <h3>3.1 Status of Ph. D.</h3>
            <p>(During the assessment period)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        {phdStatusData.map((data) => (
                            <th key={data.id}>{data.label}</th>
                        ))}
                        <th>Total Score</th>
                        {isEditable? <th>Actions</th> : null}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {phdStatusData.map((data) => (
                            <Row
                                key={data.id}
                                value={(user[0] && user[0].phdStatus && user[0].phdStatus[data.field]) || ''}
                                isEditable={isEditable}
                                type="text"
                                setValue={(newValue) => updatePhDStatus(data.field, newValue)}
                            />
                        ))}
                        <td><strong>{getTotalScore()}</strong></td>
                        {isEditable? (
                            <td>
                                <button className="d-block mx-auto btn btn-danger" onClick={() => deleteRow(phdStatusData.length - 1)}>Delete</button>
                            </td>
                        ) : null}
                    </tr>
                </tbody>
            </table>
            {!isEditable? (
                <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
            ) : null}
        </div>
    );
};

export default PhDStatusTable;