import React, { useEffect } from 'react';
import { MapStateToProps } from '../../store';
import { UserStoreState } from '../../store/user/Index';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserStart } from '../../store/user/Action';
import { UserLogin } from '../../interfaces/User';

type DispatchProps = {
    getUserStart: (user: UserLogin) => void;
};

type Props = UserStoreState & DispatchProps;

const Dashboard: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user === undefined) {
            console.log('not signed in');
            navigate("/");
        }
        console.log('signed in');
        console.log(props.user);
    }, [props.user]);

    return (
        <React.Fragment>
            <p>Logged in!!</p>
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        user: state.user.user,
    };
};

type DispatchPropsArgs = {
    type: string;
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        getUserStart: (user: UserLogin) => dispatch(getUserStart(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
