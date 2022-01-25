import React, { useEffect } from 'react';
import { MapStateToProps } from '../../store';
import { UserStoreState } from '../../store/user/Index';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserStart } from '../../store/user/Action';
import { UserLogin } from '../../interfaces/api/User';
import {default as DashboardTemplate} from '../../atomic/templates/Dashboard/Dashboard';

type DispatchProps = {
    getUserStart: (user: UserLogin) => void;
};

type Props = UserStoreState & DispatchProps;

const Dashboard: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    let params = useParams();

    const testServers = [
        {
            "id": "483675088483385344",
            "name": "Doki Doki ICT Club",
            "icon": "d746f9e463a8e4bdf6b34922ea5a51d1",
            "owner": false,
            "permissions": "2199023255551",
            "features": [],
            "alreadyJoined": false
        },
        {
            "id": "635122348596396043",
            "name": "ForMyself",
            "icon": null,
            "owner": true,
            "permissions": "2199023255551",
            "features": [],
            "alreadyJoined": false
        },
        {
            "id": "738473524435353641",
            "name": "The Game Corner",
            "icon": "6db5fca41593bccacef83efffbcb83aa",
            "owner": false,
            "permissions": "2199023255551",
            "features": [],
            "alreadyJoined": false
        },
        {
            "id": "738677843545948251",
            "name": "The Game Corner test server",
            "icon": null,
            "owner": true,
            "permissions": "2199023255551",
            "features": [],
            "alreadyJoined": false
        },
        {
            "id": "750331817663529030",
            "name": "The Game Corner Self Test",
            "icon": null,
            "owner": true,
            "permissions": "2199023255551",
            "features": [],
            "alreadyJoined": false
        },
        {
            "id": "794988966590808124",
            "name": "Joey's bot test",
            "icon": null,
            "owner": true,
            "permissions": "2199023255551",
            "features": [],
            "alreadyJoined": true
        },
        {
            "id": "795036608335970306",
            "name": "Joey's bot test 2",
            "icon": null,
            "owner": true,
            "permissions": "2199023255551",
            "features": [],
            "alreadyJoined": false
        }
    ];

    const testCurrentServerId = params.serverId;

    useEffect(() => {
        if (props.user === undefined) {
            navigate("/");
        }
    }, [props.user, navigate]);

    return (
        <DashboardTemplate servers={testServers} currentServerId={testCurrentServerId} />
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
