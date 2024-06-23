import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../context/UserContext';

const EmployeeDetails = ({ isEditable }) => {
    const { user, updateUser } = useContext(UserContext);

    const updateField = (field, newValue) => {
        const updatedUser = [...user];
        const [mainField, subField] = field.split('.');
        if (subField) {
            updatedUser[0][mainField][subField] = newValue;
        } else {
            updatedUser[0][field] = newValue;
        }
        updateUser(updatedUser);
    };

    if (!user || user.length === 0) {
        return <div>Loading...</div>;
    }

    const renderField = (key, value) => {
        if (key === 'id') return null;

        let inputType = "text";
        if (key.toLowerCase().includes("date")) {
            inputType = "date";
        } else if (typeof value === "number") {
            inputType = "number";
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
        return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])/g, ' $1').replace(/\./g, ' ').replace(/^./, str => str.toUpperCase());
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
        'contactAddress'
    ];

    return (
        <div className='d-block mx-auto'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {fieldsToShow.map((key) => {
                        const value = user[0][key]?.value ?? user[0][key];
                        return renderField(key, value);
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDetails;
