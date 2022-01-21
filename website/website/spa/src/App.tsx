import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Header from './atomic/templates/layout/Header';
import AuthRedirect from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import { connect } from 'react-redux';
import { authCheckState } from './store/auth/Action';
import { MapStateToProps } from './store';
import Layout from './components/layouts/Layout/Layout';
import Loader from './atomic/atoms/Loader/Loader';
import Button from './atomic/atoms/buttons/Button/Button';

type Props = {
    onTryAutoSignUp: () => void;
    isAuthenticated: boolean;
    isAutoSigningUp?: boolean;
};

const App: React.FC<Props> = (props: Props) => {
    console.log('ttt');
    const navigate = useNavigate();

    const { onTryAutoSignUp } = props;

    useEffect(() => {
        console.log('[app] use effect run');
        if (!props.isAuthenticated) {
            console.log('auto sign up...');
            onTryAutoSignUp();
        }
    }, [onTryAutoSignUp]);

    const routes = (
        <React.Fragment>
            <Header token={null} />

            <Routes>
                <Route path="/"
                    element={<Home />}
                />
                <Route path="/auth/redirect"
                    element={<AuthRedirect token={null} />}
                />
                {props.isAuthenticated ? (
                    <Route path="/dashboard"
                        element={<Dashboard loading={false} />}
                    />
                ): ''}

                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>404 page not found</p>
                            <Button type="button"
                                onClick={() => {
                                    navigate('/');
                                }}
                            > Go Back Home
                            </Button>
                        </main>
                    }
                />
            </Routes>
        </React.Fragment>
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
