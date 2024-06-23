import React, { useState, useEffect } from 'react';

const Row = ({ value, isEditable, type, setValue }) => {
    const [editValue, setEditValue] = useState(value);

    useEffect(() => {
        setEditValue(value);
    }, [value]);

    const handleChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleBlur = () => {
        setValue(type === "number" ? parseFloat(editValue) : editValue);
    };

    return (
        <td>
            {isEditable ? (
                <input
                    type={type}
                    value={editValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : (
                value
            )}
        </td>
    );
};

export default Row;
