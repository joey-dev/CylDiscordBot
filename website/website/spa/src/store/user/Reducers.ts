import { UserStoreState } from '../auth/Index';
import * as ActionTypes from './ActionTypes';
import UpdateObject from '../../services/reducer/UpdateObject/UpdateObject';
import { User } from '../../interfaces/User';

const initialState: UserStoreState = {
    user: undefined,
    loading: false,
    success: false,
    error: undefined,
};

export type Actions = {
    type: string;
    payload: Payload;
};

type Payload = {
    user?: User;
    error?: string
};

const userReducer = (state: UserStoreState = initialState, { type, payload }: Actions) => {
    switch (type) {
        case ActionTypes.UPDATE_USER_STATE:
            return UpdateObject(state, {user: payload.user});
        case ActionTypes.UPDATE_USER_START:
            return UpdateObject(state, {loading: true});
        case ActionTypes.UPDATE_USER_FINISH:
            return UpdateObject(state, {loading: false, user: payload.user, success: true});
        case ActionTypes.UPDATE_USER_ERROR:
            return UpdateObject(state, {loading: false, error: payload.error});
        case ActionTypes.UPDATE_USER_REMOVE_SUCCESS:
            return UpdateObject(state, {success: false});
        default:
            return state;
    }
};

export default userReducer;
