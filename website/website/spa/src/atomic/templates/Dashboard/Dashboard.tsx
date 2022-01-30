import React from 'react';
import { IDetailedServer, IServer } from '../../../interfaces/api/Server';
import ItemDisplay from '../../organisms/dashboard/ItemDisplay';
import LeftMenu from '../../organisms/dashboard/LeftMenu';


type Props = {
    servers: IServer[];
    server?: IDetailedServer;
    currentServerId?: string;
};

const Dashboard: React.FC<Props> = (props: Props) => {
    const currentServer = props.servers.find(server => server.id === props.currentServerId);

    return (
        <React.Fragment>
            <LeftMenu servers={props.servers}
                currentServerId={props.currentServerId}
                server={props.server}
            />
            <ItemDisplay server={currentServer}
                currentServerId={props.currentServerId}
            />
        </React.Fragment>
    );
};

export default (Dashboard);
