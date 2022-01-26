import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Server } from '../../../interfaces/api/Server';
import ServerItem from './ServerItem';
import { useNavigate } from 'react-router-dom';


const StyledDiv = styled.div`
    margin-top: 10px;
`;

type Props = {
    servers: Server[];
    currentServerId?: string;
};

const ServerItems: React.FC<Props> = (props: Props) => {
    let serverList: JSX.Element[] = [];
    let currentServer;
    const navigate = useNavigate();

    const [isListOpened, setIsListOpened] = useState(false);
    const [currentServerId, setCurrentServerId] = useState(props.currentServerId);

    useEffect(() => {
        if (currentServerId === undefined) {
            navigate('/dashboard');
        } else {
            navigate('/dashboard/' + currentServerId);
        }
    }, [currentServerId, navigate]);

    for (let server of props.servers) {
        if (server.id === props.currentServerId) {
            currentServer = server;
        } else {
            serverList.push(<ServerItem key={server.id}
                server={server}
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