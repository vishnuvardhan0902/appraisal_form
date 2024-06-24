import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Row from './Row';

const BooksChaptersTable = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const addNewRow = () => {
        const newRow = {
            id: (user[0].booksData.length + 1).toString(),
            sNo: user[0].booksData.length + 1,
            titleOfBookArticle: "",
            nationalInternational: "",
            authors: "",
            publisherDetails: "",
            editionVolumeIssuePageNos: "",
            dateOfPublication: "",
            issnIsbnNo: "",
            publishedEdited: "",
            score: 0
        };
        const updatedUser = [...user];
        updatedUser[0].booksData = [...updatedUser[0].booksData, newRow];
        updateUser(updatedUser);
    };

    const updateBooksData = (index, field, newValue) => {
        const updatedData = [...user[0].booksData];
        updatedData[index] = { ...updatedData[index], [field]: newValue };
        const newTotalScore = updatedData.reduce((total, book) => total + parseFloat(book.score), 0);
        const updatedUser = [...user];
        updatedUser[0].booksData = updatedData;
        updatedUser[0].booksTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const deleteRow = (index) => {
        const updatedData = [...user[0].booksData];
        updatedData.splice(index, 1);
        const newTotalScore = updatedData.reduce((total, book) => total + parseFloat(book.score), 0);
        const updatedUser = [...user];
        updatedUser[0].booksData = updatedData;
        updatedUser[0].booksTotalScore = newTotalScore;
        updateUser(updatedUser);
    };

    const getGrandTotal = () => {
        return user[0].booksData.reduce((total, book) => total + parseFloat(book.score), 0);
    };

    return (
        <div>
            <h3>2.3 Books and Chapters Published/ Edited</h3>
            <p>(Score for Published - 10, Edited - 5)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Title of Book / Article</th>
                        <th>National / International</th>
                        <th>Authors (As Appeared on the Book/ Article)</th>
                        <th>Publisher Details</th>
                        <th>Edition, Volume and issue No. & page nos.</th>
                        <th>Date, Month & Year of Publication (DD-MM-YYYY)</th>
                        <th>ISSN No. / ISBN No.</th>
                        <th>Published / Edited</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user[0] && user[0].booksData && user[0].booksData.length > 0 ? (
                        user[0].booksData.map((book, index) => (
                            <tr key={book.id}>
                                <Row
                                    value={book.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={book.titleOfBookArticle}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateBooksData(index, 'titleOfBookArticle', newValue)}
                                />
                                <Row
                                    value={book.nationalInternational}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateBooksData(index, 'nationalInternational', newValue)}
                                />
                                <Row
                                    value={book.authors}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateBooksData(index, 'authors', newValue)}
                                />
                                <Row
                                    value={book.publisherDetails}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateBooksData(index, 'publisherDetails', newValue)}
                                />
                                <Row
                                    value={book.editionVolumeIssuePageNos}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateBooksData(index, 'editionVolumeIssuePageNos', newValue)}
                                />
                                <Row
                                    value={book.dateOfPublication}
                                    isEditable={isEditable}
                                    type="date"
                                    setValue={(newValue) => updateBooksData(index, 'dateOfPublication', newValue)}
                                />
                                <Row
                                    value={book.issnIsbnNo}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateBooksData(index, 'issnIsbnNo', newValue)}
                                />
                                <Row
                                    value={book.publishedEdited}
                                    isEditable={isEditable}
                                    type="text"
                                    setValue={(newValue) => updateBooksData(index, 'publishedEdited', newValue)}
                                />
                                <Row
                                    value={book.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateBooksData(index, 'score', newValue)}
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
                            <td colSpan="11">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="9" className='text-end'><strong>Total</strong></td>
                        <td><strong>{user[0] && user[0].booksData ? getGrandTotal() : 0}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addNewRow} className="d-block mx-auto mb-3 btn btn-primary">Add Row</button>
        </div>
    );
};

export default BooksChaptersTable;
