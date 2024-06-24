import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const CoreValuesTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const updateCoreValuesData = (index, field, newValue) => {
        const updatedData = [...user[0].coreValuesData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, item) => total + parseFloat(item.score), 0);
        const updatedUser = [...user];
        updatedUser[0].coreValuesData = updatedData;
        updatedUser[0].coreValuesTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].coreValuesData.reduce((total, item) => total + parseFloat(item.score), 0);
    };

    return (
        <div>
             <h2>CATEGORY6:  DEMONSTRATION OF VNR VJIET CORE VALUES AND INITIATIVES <span className='text-end '>Max. Score: 50</span></h2>
                <p>(10 for each)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].coreValuesData && user[0].coreValuesData.length > 0 ? (
                        user[0].coreValuesData.map((item, index) => (
                            <tr key={item.id}>
                                <Row
                                    value={item.parameter}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateCoreValuesData(index, 'parameter', newValue)}
                                />
                                <Row
                                    value={item.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCoreValuesData(index, 'score', newValue)}
                                />
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].coreValuesData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CoreValuesTable;
