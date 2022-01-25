import React from 'react';
import styled from 'styled-components';
import ServerItem from '../../modecules/server/ServerItem';
import { Server } from '../../../interfaces/api/Server';
import ServerItems from '../../modecules/server/ServerItems';


const StyledBackground = styled.div`
    display: block;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    background-color: #1F2129;
    color: white;
    height: 100%;
    overflow-y: auto;
    
    ::-webkit-scrollbar {
        width: 0;
    }
`;

const StyledInnerBackground = styled.div`
    padding: 24px 20px 20px;
`;

type Props = {
    servers: Server[];
    currentServerId?: string;
};

const LeftMenu: React.FC<Props> = (props: Props) => {

    return (
        <StyledBackground>
            <StyledInnerBackground>
                <ServerItems servers={props.servers} currentServerId={props.currentServerId} />
            </StyledInnerBackground>
        </StyledBackground>
    );
};

export default (LeftMenu);
