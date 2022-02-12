import React from 'react';
import { IFullModuleWithData } from '../../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../../interfaces/api/Server';
import { IEditServerData } from '../../../store/server/Sagas';
import ItemDisplay from '../../organisms/dashboard/ItemDisplay';
import LeftMenu from '../../organisms/dashboard/LeftMenu';


type Props = {
    servers: IServer[];
    server?: IDetailedServer;
    modules?: IFullModuleWithData[];
    currentServerId?: string;
    onPluginEnabledChange: (event: IEditServerData) => void;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const Dashboard: React.FC<Props> = (props: Props) => {
    const currentServer = props.servers.find(server => server.id === props.currentServerId);

    return (
        <React.Fragment>
            <LeftMenu servers={props.servers}
                currentServerId={props.currentServerId}
                server={props.server}
                modules={props.modules}
                onPluginEnabledChange={props.onPluginEnabledChange}
            />
            <ItemDisplay server={currentServer}
                currentServerId={props.currentServerId}
                modules={props.modules}
                detailedServer={props.server}
                onComponentEnabledChange={props.onComponentEnabledChange}
                onComponentSettingChange={props.onComponentSettingChange}
            />
        </React.Fragment>
    );
};

export default (Dashboard);
