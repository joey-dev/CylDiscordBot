import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Button } from '@mui/material';
import Loader from './atomic/atoms/Loader/Loader';
import Header from './atomic/templates/layout/Header';
import Layout from './components/layouts/Layout/Layout';
import AuthRedirect from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import { MapStateToProps } from './store';
import { authCheckState } from './store/auth/Action';

type Props = {
    onTryAutoSignUp: () => void;
    isAuthenticated: boolean;
    isAutoSigningUp?: boolean;
};

const App: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();

    const {onTryAutoSignUp} = props;

    useEffect(() => {
        if (!props.isAuthenticated) {
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
                    <React.Fragment>
                        <Route path="/dashboard"
                            element={<Dashboard loading={false} />}
                        >
                            <Route path=":serverId"
                                element={<Dashboard loading={false} />}
                            >
                                <Route path=":moduleId/:pluginId"
                                    element={<Dashboard loading={false} />}
                                />
                            </Route>
                        </Route>
                    </React.Fragment>
                ) : ''}

                <Route
                    path="*"
                    element={
                        <main style={{padding: '1rem'}}>
                            <p>404 page not found</p>
                            <Button
                                variant="outlined"
                                color="secondary"
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
