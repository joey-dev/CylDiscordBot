export type ConfigFormValidationProfileType = {
    username: ConfigFormInputValidationProfileType;
    firstName: ConfigFormInputValidationProfileType;
    lastName: ConfigFormInputValidationProfileType;
    email: ConfigFormInputValidationProfileType;
    password: ConfigFormInputValidationProfileType;
}

export type ConfigFormInputValidationProfileType = {
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    isEmail?: boolean;
}

const ConfigFormValidationProfile: ConfigFormValidationProfileType = {
    username: {
        minLength: 4,
        required: true,
    },
    firstName: {
        required: true,
    },
    lastName: {
        required: true,
    },
    email: {
        minLength: 4,
        required: true,
        isEmail: true,
    },
    password: {
        minLength: 6,
    },
};

export default ConfigFormValidationProfile;
