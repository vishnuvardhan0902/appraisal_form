import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../Register.css';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [newUserState, setNewUser] = useState([]);
  let navigate = useNavigate();

  async function handleForm(NewUser) {
    const newUser = {
      username: NewUser.username,
      empType:NewUser.empType,
      employeeCode: "enter code",
      nameOfEmployee: "enter name",
      dateOfBirth: "enter dob",
      dateOfJoining: "",
      currentDesignation: "",
      department: "",
      assessmentPeriod: "",
      presentPay: "",
      leavesAvailed: "",
      educationalQualifications: "",
      higherQualifications: "",
      specialization: "",
      periodOfService: "",
      experienceBeforeJoining: "",
      totalExperience: "",
      contactAddress: "",
      newTableData: [],
      newTableTotalScore: 0,
      newTableGrandTotalScore: 0,
      secondTableData: [],
      secondTableTotalScore: 0,
      secondTableGrandTotalScore: 0,
      projectsData: [],
      projectsTotalScore: 0,
      grandprojectsTotalScore: 0,
      papersData: [],
      papersDataTotalScore: 0,
      citationsData: [],
      citationsTotalScore: 0,
      booksData: [],
      booksTotalScore: 0,
      patentsData: [],
      patentsTotalScore: 0,
      phdStatus: [],
      researchProjectsData: [],
      researchProjectsTotalScore: 0,
      consultancyProjectsData: [],
      consultancyProjectsTotalScore: 0,
      researchGuidanceData: [],
      researchGuidanceTotalScore: 0,
      researchInterestGroupsData: [],
      researchInterestGroupsTotalScore: 0,
      nationalInternationalData: [],
      nationalInternationalTotalScore: 0,
      industryLinkageData: [],
      industryLinkageTotalScore: 0,
      organizingProgramsData: [],
      organizingProgramsTotalScore: 0,
      attendingProgramsData: [],
      attendingProgramsTotalScore: 0,
      facultyResourcePersonsData: [],
      facultyResourcePersonsTotalScore: 0,
      facultyEditorialBoardsData: [],
      facultyEditorialBoardsTotalScore: 0,
      trainingProgrammesData: [],
      trainingProgrammesTotalScore: 0,
      internationalTravelData: [],
      internationalTravelTotalScore: 0,
      contributionData: [],
      contributionTotalScore: 0,
      studentActivitiesData: [],
      studentActivitiesTotalScore: 0,
      professionalBodiesData: [],
      professionalBodiesTotalScore: 0,
      awardsData: [],
      awardsTotalScore: 0,
      differentiatorsData: [],
      differentiatorsTotalScore: 0,
      internshipsData: [],
      internshipsTotalScore: 0,
      coreValuesData: [
        { id: 1, parameter: "Punctuality, Attitude and Motivation", score: 0 },
        { id: 2, parameter: "Professionalism", score: 0 },
        { id: 3, parameter: "Willingness to Learn and Work", score: 0 },
        { id: 4, parameter: "Cordiality and Team Spirit", score: 0 },
        { id: 5, parameter: "Novel Pedagogical Methods and Instructional Materials used", score: 0 }
      ],
      coreValuesTotalScore: 0,
      summaryData: [
        { id: 1, category: "Teaching, Learning & Evaluation", maxScore: 150, selfAppraisal: 0, hodAssessment: 0 },
        { id: 2, category: "Research & Consultancy", maxScore: 150, selfAppraisal: 0, hodAssessment: 0 },
        { id: 3, category: "Faculty Development", maxScore: 100, selfAppraisal: 0, hodAssessment: 0 },
        { id: 4, category: "Governance & Administration", maxScore: 50, selfAppraisal: 0, hodAssessment: 0 },
        { id: 5, category: "Supplementary Process", maxScore: 50, selfAppraisal: 0, hodAssessment: 0 },
        { id: 6, category: "Demonstration of VNRVJIET Core Values and Initiatives", maxScore: 50, selfAppraisal: 0, hodAssessment: 0 }
      ],
      summaryTotalScore: 0
    };

    const employeeData = {
      username: NewUser.username,
      password: "", // Assign a default password if needed
      nameOfEmployee: "enter name",
      dateOfBirth: "enter dob",
      dateOfJoining: "",
      currentDesignation: "",
      department: "",
      assessmentPeriod: "",
      presentPay: "",
      leavesAvailed: "",
      educationalQualifications: "",
      higherQualifications: "",
      specialization: "",
      periodOfService: "",
      experienceBeforeJoining: "",
      totalExperience: "",
      contactAddress: "",
      empType:NewUser.empType
    };

    try {
      // Check if user already exists
      const userResponse = await axios.get(`http://localhost:4002/users?username=${NewUser.username}`);
      if (userResponse.data.length > 0) {
        console.log('User already exists:', userResponse.data[0]);
        alert('User already exists');
      } else {
        // Register new user
        await axios.all([
          axios.post('http://localhost:4002/users', newUser),
          axios.post('/register', employeeData)
        ])
        .then(axios.spread((newUserResponse, employeeResponse) => {
          setNewUser([...newUserState, newUserResponse.data]);
          navigate('/');
        }));
      }
    } catch (error) {
      console.error('Error adding new row:', error);
      alert('Error registering user');
    }
  }

  return (
    <div className="container">
      <div className="page-container">
        <div className="register-page">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(handleForm)}>
            <div>
              <label>Faculty ID:</label>
              <input type="text" {...register('username')} required />
              <label>EmpType</label>
              <input type="text" {...register('empType')} required />
            </div>
            <button type="submit">Register</button>
          </form>
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
