import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const ResearchPapersTable = ({ isEditable }) => {
    const { user, setUser, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].papersData.length + 1).toString(),
            sNo: user[0].papersData.length + 1,
            publicationDetails: {
                journalConferenceName: "",
                nationalInternational: ""
            },
            authors: "",
            titleOfPaper: "",
            volumeIssuePageNos: "",
            dateOfPublication: "",
            issnIsbnNo: "",
            impactFactor: "",
            indexedIn: "",
            numberOfCitations: 0,
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].papersData = [...updatedUser[0].papersData, newRow];
        updateUser(updatedUser);
    };

    const updatePaperData = (index, field, newValue) => {
        const updatedData = [...user[0].papersData];
        if (field.includes('.')) {
            const [outerField, innerField] = field.split('.');
            updatedData[index] = { 
                ...updatedData[index], 
                [outerField]: { 
                    ...updatedData[index][outerField], 
                    [innerField]: newValue 
                } 
            };
        } else {
            updatedData[index] = { ...updatedData[index], [field]: newValue };
        }
        const newTotalScore = updatedData.reduce((total, paper) => total + parseFloat(paper.score), 0);
        const updatedUser = [...user];
        updatedUser[0].papersData = updatedData;
        updatedUser[0].papersTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].papersData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, paper) => total + parseFloat(paper.score), 0);
        const updatedUser = [...user];
        updatedUser[0].papersData = updatedData;
        updatedUser[0].papersTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].papersData.reduce((total, paper) => total + parseFloat(paper.score), 0);
    };

    return (
        <div>
            <h2>CATEGORY 2:  RESEARCH & CONSULTANCY					<span className='text-end '>Max. Score: 150</span></h2>
            <h3>2.1 Research Papers Published in Journals / Conferences</h3>
            <p>(Score is 15 for Quality publications in SCI / WoS / SCOPUS / ICI Indexed Journals / Conferences. 5 for Other National / International Journals / Conference Proceedings.)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Publication Details<br />(Journal / Conference Name)</th>
                        <th>Publication Details<br />(National / International)</th>
                        <th>Authors<br />(As listed in the paper)</th>
                        <th>Title of Paper</th>
                        <th>Volume and issue No. &amp; page nos.</th>
                        <th>Date of Publication<br />(DD-MM-YYYY)</th>
                        <th>ISSN No./ ISBN No.</th>
                        <th>Impact Factor</th>
                        <th>Indexed In<br />SCI/ WoS/ SCOPUS / ICI</th>
                        <th>Number of Citations</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].papersData && user[0].papersData.length > 0 ? (
                        user[0].papersData.map((paper, index) => (
                            <tr key={paper.id}>
                                <Row
                                    value={paper.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={paper.publicationDetails.journalConferenceName}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'publicationDetails.journalConferenceName', newValue)}
                                />
                                <Row
                                    value={paper.publicationDetails.nationalInternational}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'publicationDetails.nationalInternational', newValue)}
                                />
                                <Row
                                    value={paper.authors}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'authors', newValue)}
                                />
                                <Row
                                    value={paper.titleOfPaper}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'titleOfPaper', newValue)}
                                />
                                <Row
                                    value={paper.volumeIssuePageNos}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'volumeIssuePageNos', newValue)}
                                />
                                <Row
                                    value={paper.dateOfPublication}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'dateOfPublication', newValue)}
                                />
                                <Row
                                    value={paper.issnIsbnNo}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'issnIsbnNo', newValue)}
                                />
                                <Row
                                    value={paper.impactFactor}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'impactFactor', newValue)}
                                />
                                <Row
                                    value={paper.indexedIn}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updatePaperData(index, 'indexedIn', newValue)}
                                />
                                <Row
                                    value={paper.numberOfCitations}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updatePaperData(index, 'numberOfCitations', newValue)}
                                />
                                <Row
                                    value={paper.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updatePaperData(index, 'score', newValue)}
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
                        <td colSpan="11" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].papersData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default ResearchPapersTable;
