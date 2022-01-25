import React from 'react';
import LeftMenu from '../../organisms/dashboard/LeftMenu';
import ItemDisplay from '../../organisms/dashboard/ItemDisplay';
import { Server } from '../../../interfaces/api/Server';


type Props = {
    servers: Server[];
    currentServerId?: string;
};

const Dashboard: React.FC<Props> = (props: Props) => {

    return (
        <React.Fragment>
            <LeftMenu servers={props.servers} currentServerId={props.currentServerId} />
            <ItemDisplay />
        </React.Fragment>
    );
};

export default (Dashboard);
