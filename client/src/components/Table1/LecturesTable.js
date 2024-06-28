// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const LecturesTable = ({ isEditable }) => {
//     const [tableData, setTableData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchLectures();
//     }, []);

//     const fetchLectures = () => {
//         axios.get('/api/lectures')
//             .then((response) => {
//                 setTableData(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error('Error fetching lectures data:', error);
//                 setLoading(false);
//             });
//     };

//     const addNewRow = () => {
//         const newRow = {
//             sNo: tableData.length + 1,
//             courseName: '',
//             techYearSemester: '',
//             novelMethodsDetails: '',
//             novelMethodsScore: 0,
//             teachingPeriodsPlanned: 0,
//             teachingPeriodsConducted: 0,
//             classesEngaged: 0,
//             totalScore: 0,
//         };

//         axios.post('/api/lectures', newRow)
//             .then((response) => {
//                 setTableData([...tableData, response.data]);
//             })
//             .catch((error) => {
//                 console.error('Error adding new row:', error);
//             });
//     };

//     const updateField = (index, field, newValue) => {
//         const updatedLecture = { ...tableData[index], [field]: newValue };
//         const updatedData = [...tableData];
//         updatedData[index] = updatedLecture;
//         setTableData(updatedData);

//         axios.put(`/api/lectures/${updatedLecture.id}`, updatedLecture)
//             .then((response) => {
//                 // Optionally handle response if needed
//             })
//             .catch((error) => {
//                 console.error('Error updating lecture data:', error);
//             });
//     };

//     const deleteLecture = (id, index) => {
//         axios.delete(`/api/lectures/${id}`)
//             .then(() => {
//                 const updatedLectures = [...tableData];
//                 updatedLectures.splice(index, 1);
//                 setTableData(updatedLectures);
//             })
//             .catch((error) => {
//                 console.error('Error deleting lecture:', error);
//             });
//     };

//     const getGrandTotal = () => {
//         return tableData.reduce((total, lecture) => total + parseFloat(lecture.totalScore), 0);
//     };

//     const formatFieldLabel = (key) => {
//         return key
//             .replace(/([a-z])([A-Z])/g, '$1 $2')
//             .replace(/([A-Z])/g, ' $1')
//             .replace(/\./g, ' ')
//             .replace(/^./, (str) => str.toUpperCase());
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Lectures Table</h2>
//             <table className="table table-bordered table-striped">
//                 <thead>
//                     <tr>
//                         <th>S.No</th>
//                         <th>Course Name</th>
//                         <th>Tech Year Semester</th>
//                         <th>Novel Methods Details</th>
//                         <th>Novel Methods Score</th>
//                         <th>Teaching Periods Planned</th>
//                         <th>Teaching Periods Conducted</th>
//                         <th>Classes Engaged</th>
//                         <th>Total Score</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tableData.length > 0 ? (
//                         tableData.map((lecture, index) => (
//                             <tr key={lecture.id}>
//                                 <td>{lecture.sNo}</td>
//                                 <td>
//                                     {isEditable ? (
//                                         <input
//                                             type="text"
//                                             value={lecture.courseName}
//                                             onChange={(e) => updateField(index, 'courseName', e.target.value)}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         lecture.courseName
//                                     )}
//                                 </td>
//                                 <td>
//                                     {isEditable ? (
//                                         <input
//                                             type="text"
//                                             value={lecture.techYearSemester}
//                                             onChange={(e) => updateField(index, 'techYearSemester', e.target.value)}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         lecture.techYearSemester
//                                     )}
//                                 </td>
//                                 <td>
//                                     {isEditable ? (
//                                         <input
//                                             type="text"
//                                             value={lecture.novelMethodsDetails}
//                                             onChange={(e) => updateField(index, 'novelMethodsDetails', e.target.value)}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         lecture.novelMethodsDetails
//                                     )}
//                                 </td>
//                                 <td>{lecture.novelMethodsScore}</td>
//                                 <td>
//                                     {isEditable ? (
//                                         <input
//                                             type="number"
//                                             value={lecture.teachingPeriodsPlanned}
//                                             onChange={(e) => updateField(index, 'teachingPeriodsPlanned', parseInt(e.target.value))}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         lecture.teachingPeriodsPlanned
//                                     )}
//                                 </td>
//                                 <td>
//                                     {isEditable ? (
//                                         <input
//                                             type="number"
//                                             value={lecture.teachingPeriodsConducted}
//                                             onChange={(e) => updateField(index, 'teachingPeriodsConducted', parseInt(e.target.value))}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         lecture.teachingPeriodsConducted
//                                     )}
//                                 </td>
//                                 <td>
//                                     {isEditable ? (
//                                         <input
//                                             type="number"
//                                             value={lecture.classesEngaged}
//                                             onChange={(e) => updateField(index, 'classesEngaged', parseInt(e.target.value))}
//                                             className="form-control"
//                                         />
//                                     ) : (
//                                         lecture.classesEngaged
//                                     )}
//                                 </td>
//                                 <td>{lecture.totalScore}</td>
//                                 <td>
//                                     {isEditable ? (
//                                         <div>
//                                             <button className="btn btn-danger mx-1" onClick={() => deleteLecture(lecture.id, index)}>Delete</button>
//                                         </div>
//                                     ) : (
//                                         <div>
//                                             <button className="btn btn-warning mx-1" disabled>Delete</button>
//                                         </div>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="10">No data available</td>
//                         </tr>
//                     )}
//                     <tr>
//                         <td colSpan="8" className='text-end'><strong>Grand Total</strong></td>
//                         <td><strong>{getGrandTotal()}</strong></td>
//                     </tr>
//                 </tbody>
//             </table>
//             {isEditable && (
//                 <div className="text-center">
//                     <button className="btn btn-primary" onClick={addNewRow}>Add Row</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LecturesTable;


import React from 'react'

function LecturesTable() {
  return (
    <div>LecturesTable</div>
  )
}

export default LecturesTable;