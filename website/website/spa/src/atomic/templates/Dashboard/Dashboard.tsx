import React from 'react';
import LeftMenu from '../../organisms/dashboard/LeftMenu';
import ItemDisplay from '../../organisms/dashboard/ItemDisplay';
import { Server } from '../../../interfaces/api/Server';


type Props = {
    servers: Server[];
    currentServerId?: string;
};

const Dashboard: React.FC<Props> = (props: Props) => {
    const currentServer = props.servers.find(server => server.id === props.currentServerId);

    return (
        <React.Fragment>
            <LeftMenu servers={props.servers} currentServerId={props.currentServerId} />
            <ItemDisplay server={currentServer} currentServerId={props.currentServerId} />
        </React.Fragment>
    );
};

export default (Dashboard);
