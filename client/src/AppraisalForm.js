import React, { useEffect, useContext } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import EmployeeDetails from './components/Table1/EmployeeDetails';
import LecturesTable from './components/Table1/LecturesTable';
import CoursesTable from './components/Table1/CoursesTable';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from './context/UserContext';
import AcademicProjectsTable from './components/Table1/AcademicProjectsTable';
import ResearchPapersTable from './components/Table1/ResearchPapersTable';
import CitationsTable from './components/Table1/CitationsTable';
import BooksChaptersTable from './components/Table1/BookChaptersTable';
import PatentsTable from './components/Table1/PatentsTable';
import SponsoredResearchProjectsTable from './components/Table1/SponseredResearchProjectsTable';
import ConsultancyProjectsTable from './components/Table1/ConsultancyProjectsTable';
import ResearchGuidanceTable from './components/Table1/ResearchGuidanceTable';
import ResearchInterestGroupsTable from './components/Table1/ResearchInterestGroupsTable';
import NationalInternationalTable from './components/Table1/NationalInternationalTable';
import IndustryLinkageTable from './components/Table1/IndustryLinkageTable';
import PhDStatusTable from './components/Table1/PhdStatusTable';
import OrganizingProgramsTable from './components/Table1/OrganisingProgramsTable';
import AttendingProgramsTable from './components/Table1/AttendingProgramsTable';
import FacultyResourcePersonsTable from './components/Table1/FacultyResourcePersonTable';
import FacultyEditorialBoardsTable from './components/Table1/FacultyEditorialBoardsTable';
import TrainingProgrammesTable from './components/Table1/TrainingProgramsTable';
import InternationalTravelTable from './components/Table1/InternationalTravelTable';
import ContributionTable from './components/Table1/ContributionTable';
import StudentActivitiesTable from './components/Table1/StudentActivitiesTable';
import ProfessionalBodiesTable from './components/Table1/ProfessionalBodiesTable';
import AwardsTable from './components/Table1/AwardsTable';
import DifferentiatorsTable from './components/Table1/DifferentiatorsTable';
import InternshipsTable from './components/Table1/InternshipsTable';
import CoreValuesTable from './components/Table1/CoreValuesTable';
import SummaryOfScores from './components/Table1/SummaryOfScores';
function AppraisalForm() {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const [isEditable, setIsEditable] = React.useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4002/users?username=${location.state.username}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [location.state.username, setUser]);

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    return (
        <div className="App container-fluid">
            <h1 className="text-center mb-4">Faculty Annual Performance Self Appraisal</h1>
            <div className="row">
                <div className="col-md-6">
                    <button className="edit-button btn btn-primary" onClick={toggleEdit}>
                        {isEditable ? "Disable Edit" : "Enable Edit"}
                    </button>
                </div>
                <div className="col-md-12">
                    <EmployeeDetails isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <LecturesTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <CoursesTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <AcademicProjectsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ResearchPapersTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <CitationsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <BooksChaptersTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PatentsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <SponsoredResearchProjectsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ConsultancyProjectsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ResearchGuidanceTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ResearchInterestGroupsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <NationalInternationalTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <IndustryLinkageTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PhDStatusTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <OrganizingProgramsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <AttendingProgramsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <FacultyResourcePersonsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <FacultyEditorialBoardsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <TrainingProgrammesTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InternationalTravelTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ContributionTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <StudentActivitiesTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ProfessionalBodiesTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <AwardsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <DifferentiatorsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <InternshipsTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <CoreValuesTable isEditable={isEditable} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <SummaryOfScores isEditable={isEditable} />
                </div>
            </div>
        </div>
    );
}

export default AppraisalForm;
