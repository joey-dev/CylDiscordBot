const UpdateObject = (oldObject: {}, updatedProperties?: {}) => {
    if (updatedProperties) {
        return {
            ...oldObject,
            ...updatedProperties,
        };
    }
    return oldObject;
};

export default UpdateObject;
