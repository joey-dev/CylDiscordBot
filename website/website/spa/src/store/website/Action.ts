import * as actionTypes from './ActionTypes';
import { IDisplayLanguage } from './index';

export const setWebsiteLanguage = (language: IDisplayLanguage) => {
    return {
        type: actionTypes.SET_WEBSITE_LANGUAGE,
        payload: {
            language,
        },
    };
};
