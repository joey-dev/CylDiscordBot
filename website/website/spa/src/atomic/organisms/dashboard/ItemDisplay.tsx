import React from 'react';
import styled from 'styled-components';
import { IServer } from '../../../interfaces/api/Server';
import Button from '../../atoms/buttons/Button/Button';
import NoFunctionalServer from '../../modecules/dashboard/itemDisplay/NoFunctionalServer';


const StyledBackground = styled.div`
    background-color: #36393F;
    width: calc(100vw - 300px);
    position: absolute;
    left: 300px;
    height: calc(95vh - 32px);
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 6px;
        padding: 3px
    }

    ::-webkit-scrollbar-thumb {
        background-color: #43464D;
    }
`;


type Props = {
    server?: IServer;
    currentServerId?: string;
};

const ItemDisplay: React.FC<Props> = (props: Props) => {
    return (
        <StyledBackground>
            {props.server && props.server.alreadyJoined ? (
                <p>works</p>
            ) : (
                <NoFunctionalServer server={props.server}
                    currentServerId={props.currentServerId}
                />
            )}
        </StyledBackground>
    );
};

export default (ItemDisplay);
