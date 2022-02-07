import { UserStoreState } from '../user';
import * as ActionTypes from './ActionTypes';
import UpdateObject from '../../services/reducer/UpdateObject/UpdateObject';
import { IUser } from '../../interfaces/api/User';

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
    user?: IUser;
    error?: string
};

const userReducer = (state: UserStoreState = initialState, { type, payload }: Actions) => {
    switch (type) {
        case ActionTypes.GET_USER_STATE:
            return UpdateObject(state, {user: payload.user});
        case ActionTypes.GET_USER_START:
            return UpdateObject(state, {loading: true});
        case ActionTypes.SET_USER_START:
            return UpdateObject(state, {loading: true});
        case ActionTypes.GET_USER_FINISH:
            return UpdateObject(state, {loading: false, user: payload.user, success: true});
        case ActionTypes.SET_USER_FINISH:
            return UpdateObject(state, {loading: false, user: payload.user, success: true});
        case ActionTypes.GET_USER_ERROR:
            return UpdateObject(state, {loading: false, error: payload.error});
        case ActionTypes.GET_USER_REMOVE_SUCCESS:
            return UpdateObject(state, {success: false});
        default:
            return state;
    }
};

export default userReducer;
