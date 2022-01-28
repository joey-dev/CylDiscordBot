import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../atomic/atoms/Loader/Loader';
import { default as DashboardTemplate } from '../../atomic/templates/Dashboard/Dashboard';
import { UserLogin } from '../../interfaces/api/User';
import { MapStateToProps } from '../../store';
import { setServersStart, setServerStart } from '../../store/server/Action';
import { ServerStoreState } from '../../store/server/Index';
import { getUserStart } from '../../store/user/Action';
import { UserStoreState } from '../../store/user/Index';

type DispatchProps = {
    getUserStart: (user: UserLogin) => void;
    getServersStart: () => void;
    getServerStart: (server_id: string) => void;
};

type Props = UserStoreState & DispatchProps & ServerStoreState;

const Dashboard: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        props.getServersStart();
    }, []);

    const currentServerId = params.serverId;

    useEffect(() => {
        if (props.user === undefined) {
            navigate('/');
        }
    }, [props.user, navigate]);

    useEffect(() => {
        if (currentServerId) {
            props.getServerStart(currentServerId);
        }
    }, [currentServerId])

    return (
        props.loading || props.servers === undefined ? (<Loader centered={true} />) : (
            <DashboardTemplate servers={props.servers}
                currentServerId={currentServerId}
                server={props.server}
            />
        )
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        user: state.user.user,
        servers: state.server.servers,
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
        getServersStart: () => dispatch(setServersStart()),
        getServerStart: (server_id: string) => dispatch(setServerStart(server_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
