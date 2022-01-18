import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Calendar from './pages/Calendar/Calendar';
import Layout from './components/layouts/Layout/Layout';
import { connect } from 'react-redux';
import { authCheckState } from './store/auth/Action';
import Loader from './atomic/atoms/Loader/Loader';
import { MapStateToProps } from './store';

type Props = {
    onTryAutoSignUp: () => void;
    isAuthenticated: boolean;
    isAutoSigningUp: boolean;
};

const App: React.FC<Props> = (props: Props) => {
    const { onTryAutoSignUp } = props;

    useEffect(() => {
        console.log('[app] useeffect run');
        onTryAutoSignUp();
    }, [onTryAutoSignUp]);

    const routes = props.isAuthenticated ? (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Calendar} />
        </Switch>
    ) : (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Redirect to="/login" />
        </Switch>
    );

    return <Layout>{props.isAutoSigningUp ? <Loader centered={true} /> : routes}</Layout>;
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        isAuthenticated: state.auth.userId !== null,
        isAutoSigningUp: state.auth.isAutoSigningUp,
    };
};

type DispatchPropsArgs = {
    type: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        onTryAutoSignUp: () => dispatch(authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
