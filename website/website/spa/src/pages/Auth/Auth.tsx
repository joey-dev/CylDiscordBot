import React, { useEffect } from 'react';
import { auth, setAuthRedirectPath } from '../../store/auth/Action';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapStateToProps } from '../../store';
import { AuthStoreState } from '../../store/auth';
import Loader from '../../atomic/atoms/Loader/Loader';

type DispatchProps = {
    onAuth: (code: string) => void;
    onSetAuthRedirectPath: (path: string) => void;
};

type Props = AuthStoreState & DispatchProps;

const AuthRedirect: React.FC<Props> = (props: Props) => {
    const useQuery = () => new URLSearchParams(useLocation().search);

    const query = useQuery();

    const code = query.get('code');
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isAuthenticated) {
            navigate("/dashboard");
        }
    }, [props.isAuthenticated]);

    if (!props.isAuthenticated && !props.loading) {
        if (typeof code !== 'string' || props.error) {
            return (
                <p>an error occurred while logging in. please try again</p>
            )
        } else {
            props.onAuth(code);
        }
    }

    return (
        <React.Fragment>
            {props.loading && <Loader centered />}
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
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        onAuth: (code: string) => dispatch(auth(code)),
        onSetAuthRedirectPath: (path: string) => dispatch(setAuthRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
