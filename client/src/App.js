import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AppraisalForm from './AppraisalForm';
import UserProvider from './context/UserContext';
import './Style.css';
import EmployeeDetails from './components/Table1/EmployeeDetails';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "Register",
        element: <Register />
    },
    {
        path: "AppraisalForm",
        element: <AppraisalForm />
    },
]);

const App = () => {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
};

export default App;
