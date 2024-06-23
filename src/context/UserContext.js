import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState([{
        "username": "",
      "employeeCode": { "value": "enter code" },
      "nameOfEmployee": { "value": "enter name" },
      "dateOfBirth": { "value": "enter dob" },
      "dateOfJoining": { "value": "" },
      "currentDesignation": { "value": "" },
      "department": { "value": "" },
      "assessmentPeriod": { "value": "" },
      "presentPay": { "value": "" },
      "leavesAvailed": { "value": "" },
      "educationalQualifications": { "value": "" },
      "higherQualifications": { "value": "" },
      "specialization": { "value": "" },
      "periodOfService": { "value": "" },
      "experienceBeforeJoining": { "value": "" },
      "totalExperience": { "value": "" },
      "contactAddress": { "value": "" },
      "newTableData": [],
      "newTableTotalScore": 0,
      "newTableGrandTotalScore": 0,
      "secondTableData": [],
      "secondTableTotalScore": 0,
      "secondTableGrandTotalScore": 0,
      "projectsData": [],
      "projectsTotalScore": 0,
      "grandprojectsTotalScore": 0,
      "papersData": [],
      "papersDataTotalScore": 0,
      "citationsData": [],
      "citationsTotalScore": 0,
      "booksData": [],
      "booksTotalScore": 0,
      "patentsData": [],
      "patentsTotalScore": 0,
      "researchProjectsData": [],
      "researchProjectsTotalScore": 0,
      "consultancyProjectsData": [],
      "consultancyProjectsTotalScore": 0,
      "researchGuidanceData": [],
      "researchGuidanceTotalScore": 0,
      "researchInterestGroupsData": [],
      "researchInterestGroupsTotalScore": 0,
      "nationalInternationalData": [],
      "nationalInternationalTotalScore": 0,
      "industryLinkageData": [],
      "industryLinkageTotalScore": 0,
      "organizingProgramsData": [],
      "organizingProgramsTotalScore": 0,
      "attendingProgramsData": [],
      "attendingProgramsTotalScore": 0,
      "facultyResourcePersonsData": [],
      "facultyResourcePersonsTotalScore": 0,
      "facultyEditorialBoardsData": [],
      "facultyEditorialBoardsTotalScore": 0,
      "trainingProgrammesData": [],
      "trainingProgrammesTotalScore": 0,
      "internationalTravelData": [],
      "internationalTravelTotalScore": 0,
      "contributionData": [],
      "contributionTotalScore": 0,
      "studentActivitiesData": [],
      "studentActivitiesTotalScore": 0,
      "professionalBodiesData": [],
      "professionalBodiesTotalScore": 0,
      "awardsData": [],
      "awardsTotalScore": 0,
      "differentiatorsData": [],
      "differentiatorsTotalScore": 0,
      "internshipsData": [],
      "internshipsTotalScore": 0


    }]);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        // Assuming the server endpoint to update user data is `http://localhost:4002/users/${updatedUser[0].id}`
        fetch(`http://localhost:4002/users/${updatedUser[0].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser[0])
        }).then(response => response.json())
          .then(data => {
              console.log('Successfully updated user data:', data);
          }).catch(error => {
              console.error('Error updating user data:', error);
          });
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
