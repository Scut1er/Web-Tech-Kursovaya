"use client";

import { checkFormValidity, validationActionsConfig } from "@utils/constants";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export const enum FormValidationsFieldsIds {
    EMAIL = "email",
    PASSWORD = "password",
    USERNAME = "username",
    CONFIRM_PASSWORD = "confirmPassword",
    VERIFICATION_CODE = "verificationCode",
}

export interface IValidationValues {
    [key: string]: string;
}

export interface IValidationErrors {
    [key: string]: boolean;
}

export interface IValidationConfig {
    idList: FormValidationsFieldsIds[];
    isConfirmPassword: boolean;
}

const getInitialValidationValuesByConfig = (
    idList: FormValidationsFieldsIds[]
): IValidationValues => {
    const validationValues: IValidationValues = {};

    idList.forEach((id) => {
        validationValues[id] = "";
    });

    return validationValues;
};

const VALIDATION_ERROR_DEBOUNCE_TIMEOUT: number = 800;

const useFormValidation = (config: IValidationConfig) => {
    const { runDebounced } = useDebounce(VALIDATION_ERROR_DEBOUNCE_TIMEOUT);

    const [values, setValues] = useState<IValidationValues>(
        getInitialValidationValuesByConfig(config.idList)
    );
    const [errors, setErrors] = useState<IValidationErrors>({});
    const [isValid, setIsValid] = useState<boolean>(false);

    const [visibleErrors, setVisibleErrors] = useState<IValidationErrors>({});

    const isValidationErrorByInputData = (
        inputName: FormValidationsFieldsIds,
        inputValue: string
    ): boolean => {
        if (inputName === FormValidationsFieldsIds.CONFIRM_PASSWORD) {
            return inputValue !== values[FormValidationsFieldsIds.PASSWORD];
        }

        return !validationActionsConfig[inputName](inputValue) && !!inputValue;
    };

    const checkValidationErrorsByInputData = (
        inputName: FormValidationsFieldsIds,
        inputValue: string
    ): void => {
        const isError: boolean = isValidationErrorByInputData(
            inputName,
            inputValue
        );

        setErrors({
            ...errors,
            [inputName]: isError,
        });

        runDebounced(() =>
            setVisibleErrors({
                ...errors,
                [inputName]: isError,
            })
        );
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const target = event.target;
        const name = target.name as FormValidationsFieldsIds;
        const value = target.value;

        const currentForm = target.closest("form");

        if (!currentForm) {
            return;
        }

        setValues({ ...values, [name]: value });

        checkValidationErrorsByInputData(name, value);
    };

    useEffect(() => {
        setIsValid(checkFormValidity(values, errors));
    }, [values, errors]);

    const clearForm = (): void => {
        setValues({});
        setErrors({});
        setVisibleErrors({});
        setIsValid(false);
    };

    return {
        values,
        errors,
        visibleErrors,
        isValid,
        handleChange,
        clearForm,
    };
};

export default useFormValidation;
