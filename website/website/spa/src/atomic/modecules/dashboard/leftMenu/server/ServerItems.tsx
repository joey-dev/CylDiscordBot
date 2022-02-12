import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IDetailedServer, IServer } from '../../../../../interfaces/api/Server';
import ServerItem from './ServerItem';


const StyledDiv = styled.div`
    margin-top: 10px;
`;

type Props = {
    servers: IServer[];
    currentServerId?: string;
    server?: IDetailedServer;
};

const ServerItems: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const [isListOpened, setIsListOpened] = useState(false);
    const [currentServerId, setCurrentServerId] = useState(props.currentServerId);

    let serverList: JSX.Element[] = [];
    let currentServer: IServer | undefined;

    useEffect(() => {
        if (currentServerId === undefined) {
            navigate('/dashboard');
        } else {
            navigate('/dashboard/' + currentServerId);
        }
    }, [currentServerId]);

    for (let server of props.servers) {
        if (server.id === props.currentServerId) {
            currentServer = server;
        } else {
            serverList.push(<ServerItem key={server.id}
                server={server}
                detailedServer={props.server}
                isCurrentServer={false}
                listOpen={isListOpened}
                onArrowClick={() => setIsListOpened(!isListOpened)}
                onServerClick={(serverId => {
                    setCurrentServerId(serverId);
                    setIsListOpened(false);
                })}
            />);
        }
    }

    return (
        <React.Fragment>
            <ServerItem server={currentServer}
                isCurrentServer={true}
                listOpen={isListOpened}
                onArrowClick={() => setIsListOpened(!isListOpened)}
                onServerClick={() => {
                }}
            />
            <StyledDiv>
                {isListOpened && serverList}
            </StyledDiv>
        </React.Fragment>
    );
};

export default ServerItems;
