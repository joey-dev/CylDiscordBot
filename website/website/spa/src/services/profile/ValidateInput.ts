import ConfigFormValidationProfile, { ConfigFormInputValidationProfileType } from '../../config/formValidation/Profile';

type InputValues = {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    repeatPassword: string
};

type InputName = 'username' | 'firstName' | 'lastName' | 'email' | 'password';

const ValidateInput = (inputValues: InputValues): string[] => {
    let errors: string[] = [];

    for (const [inputValueKey, inputValue] of Object.entries(inputValues)) {
        switch (inputValueKey) {
            case 'username':
                const errorMessageUsername = ValidateInputWithInputValueAndConfigName(inputValue, 'username');
                errors = errors.concat(errorMessageUsername);
                break;
            case 'firstName':
                const errorMessageFirstName = ValidateInputWithInputValueAndConfigName(inputValue, 'firstName');
                errors = errors.concat(errorMessageFirstName);
                break;
            case 'lastName':
                const errorMessageLastName = ValidateInputWithInputValueAndConfigName(inputValue, 'lastName');
                errors = errors.concat(errorMessageLastName);
                break;
            case 'email':
                const errorMessageEmail = ValidateInputWithInputValueAndConfigName(inputValue, 'email');
                errors = errors.concat(errorMessageEmail);
                break;
            case 'password':
                const errorMessagePassword = ValidateInputWithInputValueAndConfigName(inputValue, 'password');
                errors = errors.concat(errorMessagePassword);
                break;
        }
    }

    if (inputValues.password && inputValues.password !== inputValues.repeatPassword) {
        const errorMessagePasswordAndRepeatPassword = 'The passwords are not the same';
        errors.push(errorMessagePasswordAndRepeatPassword);
    }

    return errors;
};

const ValidateInputWithInputValueAndConfigName = (inputValue: string, inputName: InputName): string[] => {
    const errorMessages: string[] = [];
    const config = ConfigFormValidationProfile[inputName];

    if (config.isEmail) {
        const regularExpressionEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!regularExpressionEmail.test(String(inputValue).toLowerCase())) {
            errorMessages.push(inputName + ' needs to be a email address.');
        }
    }

    if (config.required) {
        if (!inputValue) {
            errorMessages.push(inputName + ' is required.');
        }
    }

    if (config.minLength) {
        if (inputValue.length > 0 && inputValue.length < config.minLength) {
            errorMessages.push(inputName + ' needs to be at least ' + config.minLength + ' characters');
        }
    }

    if (config.maxLength) {
        if (inputValue.length > config.maxLength) {
            errorMessages.push(inputName + ' cannot be longer than ' + config.maxLength + ' characters');
        }
    }

    return errorMessages;
};

export default ValidateInput;
