import React, { useEffect, useState } from 'react';
import LoginTemplate from '../../atomic/templates/login/LoginTemplate';
import { AnyInputOnChange, FormOnSubmit } from '../../interfaces/formTypes/FormEvents';
import { AuthStoreState } from '../../store/auth/Index';
import { auth, setAuthRedirectPath } from '../../store/auth/Action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MapStateToProps } from '../../store';

type UseLoginData = {
    email: string;
    password: string;
};

type DispatchProps = {
    onAuth: (email: string, password: string, isSignedUp: boolean) => void;
    onSetAuthRedirectPath: (path: string) => void;
};

type Props = AuthStoreState & DispatchProps;

const Login: React.FC<Props> = (props: Props) => {
    const [user, setUser] = useState<UseLoginData>({
        email: '',
        password: '',
    });
    const [isSignUp, setIsSignUp] = useState(false);
    const { authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!authRedirectPath) {
            onSetAuthRedirectPath('/');
        }
    }, [authRedirectPath, onSetAuthRedirectPath]);

    const onSubmitHandler = (event: FormOnSubmit) => {
        event.preventDefault();
        props.onAuth(user.email, user.password, isSignUp);
    };

    const onInputChangeHandler = (event: AnyInputOnChange) => {
        let email: string = user.email;
        let password: string = user.password;

        switch (event.target.name) {
            case 'email':
                email = event.target.value;
                break;
            case 'password':
                password = event.target.value;
                break;
            default:
                return;
        }

        setUser({ email, password });
    };

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }
    return (
        <React.Fragment>
            {authRedirect}
            <LoginTemplate onSubmit={onSubmitHandler} onInputChange={onInputChangeHandler} isLoading={props.loading} values={user}/>
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

type DispatchPropsArgs = {
    type: string;
    email?: string;
    password?: string;
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        onAuth: (email: string, password: string, isSignedUp: boolean) => dispatch(auth(email, password, isSignedUp)),
        onSetAuthRedirectPath: (path: string) => dispatch(setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
