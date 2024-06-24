import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const IndustryLinkageTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].industryLinkageData.length + 1).toString(),
            sNo: user[0].industryLinkageData.length + 1,
            nameOfIndustry: "",
            contactDetails: "",
            outcome: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].industryLinkageData = [...updatedUser[0].industryLinkageData, newRow];
        updateUser(updatedUser);
    };

    const updateIndustryLinkageData = (index, field, newValue) => {
        const updatedData = [...user[0].industryLinkageData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, industry) => total + parseFloat(industry.score), 0);
        const updatedUser = [...user];
        updatedUser[0].industryLinkageData = updatedData;
        updatedUser[0].industryLinkageTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].industryLinkageData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, industry) => total + parseFloat(industry.score), 0);
        const updatedUser = [...user];
        updatedUser[0].industryLinkageData = updatedData;
        updatedUser[0].industryLinkageTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].industryLinkageData.reduce((total, industry) => total + parseFloat(industry.score), 0);
    };

    return (
        <div>
            <h3>2.10 Industry Linkage Associated</h3>
            <p>(Outcome –maybe joint Paper / Project /sharing of research facilities / Student Internships/ Student Projects etc– Score is 5 for each linkage)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name of the Industry</th>
                        <th>Name, Designation and Contact Details of the Associated Person</th>
                        <th>Outcome</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].industryLinkageData && user[0].industryLinkageData.length > 0 ? (
                        user[0].industryLinkageData.map((industry, index) => (
                            <tr key={industry.id}>
                                <Row
                                    value={industry.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={industry.nameOfIndustry}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateIndustryLinkageData(index, 'nameOfIndustry', newValue)}
                                />
                                <Row
                                    value={industry.contactDetails}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateIndustryLinkageData(index, 'contactDetails', newValue)}
                                />
                                <Row
                                    value={industry.outcome}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateIndustryLinkageData(index, 'outcome', newValue)}
                                />
                                <Row
                                    value={industry.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateIndustryLinkageData(index, 'score', newValue)}
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
                        <td><strong>{user[0] && user[0].industryLinkageData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default IndustryLinkageTable;
