import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../atomic/atoms/Loader/Loader';
import { default as DashboardTemplate } from '../../atomic/templates/Dashboard/Dashboard';
import { IUserLogin } from '../../interfaces/api/User';
import { MapStateToProps } from '../../store';
import { ServerStoreState } from '../../store/server';
import { editServerDataStart, setServersStart, setServerStart } from '../../store/server/Action';
import { IEditServerData } from '../../store/server/Sagas';
import { UserStoreState } from '../../store/user';
import { getUserStart } from '../../store/user/Action';

type DispatchProps = {
    getUserStart: (user: IUserLogin) => void;
    getServersStart: () => void;
    getServerStart: (server_id: string) => void;
    editServerDataStart: (server_id: string, data: IEditServerData) => void,
};

type Props = UserStoreState & DispatchProps & ServerStoreState;

const Dashboard: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const params = useParams();

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
    }, [currentServerId]);

    const onComponentOrPluginSettingsChange = (event: IEditServerData): void => {
        if (currentServerId) {
            props.editServerDataStart(currentServerId, event);
        }
    };

    let returnValue = (<Loader centered={true} />);

    if (!props.loading && props.servers !== undefined) {
        returnValue = (
            <DashboardTemplate servers={props.servers}
                currentServerId={currentServerId}
                server={props.server}
                modules={props.modules}
                onPluginEnabledChange={onComponentOrPluginSettingsChange}
                onComponentEnabledChange={onComponentOrPluginSettingsChange}
                onComponentSettingChange={onComponentOrPluginSettingsChange}
            />
        );
    }

    return (
        returnValue
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        user: state.user.user,
        servers: state.server.servers,
        server: state.server.server,
        modules: state.server.modules,
    };
};

type DispatchPropsArgs = {
    type: string;
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        getUserStart: (user: IUserLogin) => dispatch(getUserStart(user)),
        getServersStart: () => dispatch(setServersStart()),
        getServerStart: (server_id: string) => dispatch(setServerStart(server_id)),
        editServerDataStart: (server_id: string, data: IEditServerData) => dispatch(editServerDataStart(server_id, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
