import React, { useEffect } from 'react';
import { MapStateToProps } from '../../store';
import { UserStoreState } from '../../store/user/Index';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC<UserStoreState> = (props: UserStoreState) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user === undefined) {
            navigate("/");
        }
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

export default connect(mapStateToProps)(Dashboard);
