import authReducer from './auth/Reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthStoreState, watchAuthSagas } from './auth/Index';
import { UserStoreState, watchUserSagas } from './user/Index';
import userReducer from './user/Reducers';
import { ServerStoreState, watchServerSagas } from './server/Index';
import serverReducer from './server/Reducers';

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
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    server: serverReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuthSagas);
sagaMiddleware.run(watchUserSagas);
sagaMiddleware.run(watchServerSagas);

export default store;
