import { useEffect, useState } from "react";

const useForm = (defaultValues = {}, validation) => {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState([]);

    const updateValue = (key, value) => {
        setValues((state) => ({ ...state, [key]: value }));
    };

    const validateRule = (rule) => {
        const { validatorName, args, feedback } = rule;
        const validator = validators[validatorName]
        const valid = validator(values[fieldName], values, args);
        return valid
    }

    const validate = () => {
        let isValid = true;
        formValidation.forEach((fieldValidationRules) => {
            const fieldIsValid = validateField(fieldValidationRules);
        });
        return isValid;
    };

    const validateField = (fieldValidationRules) => {
        const { fieldName, rules } = fieldValidationRules;
        rules.forEach((rule) => {
            const valid = validateRule(rule);
            if (!valid) {
                isValid = false;
                setErrors((errors) => {
                    return {
                        ...errors,
                        [fieldName]: rule.feedback,
                    };
                });
            }
        });
    }

    return {
        values,
        setValues,
        updateValue,
        validate,
        setErrors,
        isValid: () => Object.keys(errors).length === 0,
    };
};

export default useForm;