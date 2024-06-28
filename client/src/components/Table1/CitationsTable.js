import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from './Row';

const CitationsTable = ({ isEditable }) => {
    const [citations, setCitations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCitations();
    }, []);

    const fetchCitations = () => {
        axios.get('/api/citations')
            .then(response => {
                setCitations(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching citations:', error);
                setLoading(false);
            });
    };

    const addNewRow = () => {
        const newRow = {
            sNo: citations.length + 1,
            publicationsTillDate: 0,
            publicationsWithCitations: 0,
            totalCitations: 0,
            hIndex: 0,
            score: 0
        };

        axios.post('/api/citations', newRow)
            .then(response => {
                setCitations([...citations, response.data]);
            })
            .catch(error => {
                console.error('Error adding new row:', error);
            });
    };

    const updateCitationsData = (index, field, newValue) => {
        const updatedCitation = { ...citations[index], [field]: newValue };
        const updatedCitations = [...citations];
        updatedCitations[index] = updatedCitation;

        axios.put(`/api/citations/${updatedCitation.id}`, updatedCitation)
            .then(response => {
                setCitations(updatedCitations);
            })
            .catch(error => {
                console.error('Error updating citation data:', error);
            });
    };

    const deleteRow = (id, index) => {
        axios.delete(`/api/citations/${id}`)
            .then(() => {
                const updatedCitations = [...citations];
                updatedCitations.splice(index, 1);
                setCitations(updatedCitations);
            })
            .catch(error => {
                console.error('Error deleting citation:', error);
            });
    };

    const getGrandTotal = () => {
        return citations.reduce((total, citation) => total + parseFloat(citation.score), 0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>2.2 Citations of Research Publications/Books</h3>
            <p>(Score for Cumulative citations in the range of 3-10 is 2, 11-20 is 5, 21-40 is 8, &gt; 40 is 10)</p>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>No. of Publications / Books till date</th>
                        <th>No. of publications/Books with Citations</th>
                        <th>Total No. of Citations</th>
                        <th>h-Index of the Author</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {citations.length > 0 ? (
                        citations.map((citation, index) => (
                            <tr key={citation.id}>
                                <Row
                                    value={citation.sNo}
                                    isEditable={false}
                                    type="text"
                                />
                                <Row
                                    value={citation.publicationsTillDate}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'publicationsTillDate', newValue)}
                                />
                                <Row
                                    value={citation.publicationsWithCitations}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'publicationsWithCitations', newValue)}
                                />
                                <Row
                                    value={citation.totalCitations}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'totalCitations', newValue)}
                                />
                                <Row
                                    value={citation.hIndex}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'hIndex', newValue)}
                                />
                                <Row
                                    value={citation.score}
                                    isEditable={isEditable}
                                    type="number"
                                    setValue={(newValue) => updateCitationsData(index, 'score', newValue)}
                                />
                                <td>
                                    {isEditable ? (
                                        <button className="d-block mx-auto btn btn-danger" onClick={() => deleteRow(citation.id, index)}>Delete</button>
                                    ) : (
                                        <button className="d-block mx-auto btn btn-warning" onClick={() => alert("Enable edit to use delete")}>Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No data available</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="5" className='text-end'><strong>Total</strong></td>
                        <td><strong>{getGrandTotal()}</strong></td>
                    </tr>
                </tbody>
            </table>
            {isEditable && (
                <div className="text-center">
                    <button className="btn btn-primary" onClick={addNewRow}>Add Row</button>
                </div>
            )}
        </div>
    );
};

export default CitationsTable;
