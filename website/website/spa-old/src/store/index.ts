import authReducer from './auth/Reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthStoreState, UserStoreState, watchAuthSagas } from './auth/Index';
import userReducer from './user/Reducers';
import { watchUserSagas } from './user/Index';

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
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuthSagas);
sagaMiddleware.run(watchUserSagas);

export default store;
