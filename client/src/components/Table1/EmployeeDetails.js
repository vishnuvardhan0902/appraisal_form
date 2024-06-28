import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../context/UserContext';

const EmployeeDetails = ({ isEditable }) => {
    const { user, setUser } = useContext(UserContext);
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.username) {
            fetch(`/employee?username=${user.username}`)
                .then((response) => response.json())
                .then((data) => {
                    setEmployeeData(formatEmployeeData(data));
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching employee data:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    const formatEmployeeData = (data) => {
        return {
            ...data,
            dateOfBirth: formatDate(data.dateOfBirth),
            dateOfJoining: formatDate(data.dateOfJoining)
        };
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-CA'); // Format as YYYY-MM-DD
    };

    const updateField = (field, newValue) => {
        const updatedData = { ...employeeData, [field]: newValue };
        setEmployeeData(updatedData);

        fetch('/employee', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Updated data from server:', data); // Log server response
            setUser(data);
        })
        .catch((error) => {
            console.error('Error updating employee data:', error);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderField = (key, value) => {
        if (key === 'id') return null;

        let inputType = 'text';
        if (key.toLowerCase().includes('date')) {
            inputType = 'date';
        } else if (typeof value === 'number') {
            inputType = 'number';
        }

        return (
            <tr key={key}>
                <td>{formatFieldLabel(key)}</td>
                <td>
                    {isEditable ? (
                        <input
                            type={inputType}
                            value={value}
                            onChange={(e) => updateField(key, e.target.value)}
                            placeholder={`Enter ${formatFieldLabel(key)}`}
                            className="form-control"
                        />
                    ) : (
                        value
                    )}
                </td>
            </tr>
        );
    };

    const formatFieldLabel = (key) => {
        return key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])/g, ' $1')
            .replace(/\./g, ' ')
            .replace(/^./, (str) => str.toUpperCase());
    };

    const fieldsToShow = [
        'username',
        'password',
        'nameOfEmployee',
        'dateOfBirth',
        'dateOfJoining',
        'currentDesignation',
        'department',
        'assessmentPeriod',
        'presentPay',
        'leavesAvailed',
        'educationalQualifications',
        'higherQualifications',
        'specialization',
        'periodOfService',
        'experienceBeforeJoining',
        'totalExperience',
        'contactAddress',
    ];

    return (
        <div className="d-block mx-auto">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {fieldsToShow.map((key) => {
                        const value = employeeData[key];
                        return renderField(key, value);
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDetails;
