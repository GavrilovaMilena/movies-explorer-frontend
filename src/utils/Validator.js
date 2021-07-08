import React from 'react';

export function Validator() {

    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    function handleChange(evt) {
        const input = evt.target;
        const name = input.name;
        const value = input.value;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: input.validationMessage });
        setIsValid(input.closest('form').checkValidity());
    }

    return { values, setValues, handleChange, errors, isValid };
}