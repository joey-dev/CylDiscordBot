import UpdateObject from '../../services/reducer/UpdateObject/UpdateObject';
import * as ActionTypes from './ActionTypes';
import { IDisplayLanguage, websiteStoreState } from './index';


const initialLanguageState: IDisplayLanguage = {
    flag: 'us',
    name: 'en-us',
    key: 'enUS',
};

const initialState: websiteStoreState = {
    language: initialLanguageState,
};

export type Actions = {
    type: string;
    payload: Payload;
};

type Payload = {
    language?: IDisplayLanguage
};

const userReducer = (state: websiteStoreState = initialState, {type, payload}: Actions) => {
    switch (type) {
        case ActionTypes.SET_WEBSITE_LANGUAGE:
            return UpdateObject(state, {language: payload.language});
        default:
            return state;
    }
};

export default userReducer;
