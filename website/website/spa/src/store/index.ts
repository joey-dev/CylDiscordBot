import authReducer from './auth/Reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthStoreState, watchAuthSagas } from './auth';
import { UserStoreState, watchUserSagas } from './user';
import userReducer from './user/Reducers';
import { ServerStoreState, watchServerSagas } from './server';
import serverReducer from './server/Reducers';
import { websiteStoreState } from './website';
import websiteReducer from './website/Reducers';

let composeEnhancers = compose;

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    if (typeof devToolsExtension === 'function') {
        composeEnhancers = devToolsExtension;
    }
}

export interface MapStateToProps {
    auth: AuthStoreState;
    user: UserStoreState;
    server: ServerStoreState;
    website: websiteStoreState;
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    server: serverReducer,
    website: websiteReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuthSagas);
sagaMiddleware.run(watchUserSagas);
sagaMiddleware.run(watchServerSagas);

export default store;
