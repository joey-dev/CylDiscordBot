import Axios from '../../services/Axios/AxiosConfig';
import { call, delay, put } from 'redux-saga/effects';
import * as actions from './Action';
import * as userActions from './../user/Action';
import { User } from '../../interfaces/User';

type LogoutSageAction = {
    logoutSucceed: () => void;
};

export function* logoutSaga(action: LogoutSageAction) {
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');
    yield put(actions.logoutSucceed());
}

type CheckAuthTimeoutSagaAction = {
    logout: () => void;
    payload: CheckAuthTimeoutSagaActionPayload;
};

type CheckAuthTimeoutSagaActionPayload = {
    expirationTime: number;
};

export function* checkAuthTimeoutSaga(action: CheckAuthTimeoutSagaAction) {
    yield delay(action.payload.expirationTime * 1000);
    yield put(actions.logout());
}

type AuthUserSagaAction = {
    payload: AuthUserSagaPayload;
};

type AuthUserSagaPayload = {
    email: string;
    password: string;
    isSignUp: boolean;
};

type LoginResponse = {
    data: LoginResponseData;
};

type LoginResponseData = {
    token: string;
    user: User;
};

export function* authUserSaga(action: AuthUserSagaAction) {
    yield put(actions.authStart());
    const authData = {
        username: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true,
    };
    let url = '/login_check';
    if (action.payload.isSignUp) {
        url = '/register';
    }
    try {
        const response: LoginResponse = yield Axios().post(url, authData);
        const expiresIn = 3600;

        const user: User = response.data.user;

        const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000);
        yield localStorage.setItem('token', response.data.token);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.user.userId.toString());

        yield put(userActions.updateUserState(user));
        yield put(actions.authSuccess(user.userId.toString(), response.data.token));
        yield put(actions.checkAuthTimeout(expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action: {}) {
    yield put(actions.authCheckStateStart());

    const token = yield localStorage.getItem('token');
    if (!token || token === 'undefined') {
        yield put(actions.logout());
    } else {
        const expirationDateStorage = localStorage.getItem('expirationDate');
        if (!expirationDateStorage) {
            yield put(actions.authCheckStateFinish());
            return;
        }
        const expirationDate = yield new Date(expirationDateStorage.toString());
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
            yield put(actions.authCheckStateFinish());
            return;
        }
        const userId = yield localStorage.getItem('userId');
        yield authUserLoginWithId(userId);
    }
    yield put(actions.authCheckStateFinish());
}

export type UserResponse = {
    data: UserResponseData;
};

type UserResponseData = {
    '@centext': string;
    '@id': string;
    '@type': string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: string[];
    salt?: string;
};

function* authUserLoginWithId(userId: string) {
    try {
        const response: UserResponse = yield Axios().get('/users/' + userId);
        const expiresIn = 3600;

        const user: User = {
            userId: response.data.id,
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            roles: response.data.roles,
        };

        const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000);
        yield localStorage.setItem('expirationDate', expirationDate);

        const token = localStorage.getItem('token') || undefined;

        yield put(userActions.updateUserState(user));
        yield put(actions.authSuccess(user.userId.toString(), token));
        yield put(actions.checkAuthTimeout(expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}
