import React from 'react';
import styled from 'styled-components';
import { Server } from '../../../interfaces/api/Server';
import Button from '../../atoms/buttons/Button/Button';


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
    server?: Server;
    currentServerId?: string;
};

const ItemDisplay: React.FC<Props> = (props: Props) => {
    const addBotButton = <Button type="button"
        onClick={() => {
            window.open('https://discord.com/api/oauth2/authorize?client_id=794964425819160587&permissions=2080374975&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fserver%2Fredirect&scope=bot%20applications.commands&guild_id=' + props.currentServerId, '_blank');
        }}
    >Setup bot</Button>;
    const finishButton = <Button type="button"
        onClick={() => {
            window.location.reload();
        }}
    >Finish</Button>;
    let message: string | undefined;
    let showAddBotButton: boolean = false;

    if (props.server === undefined) {
        message = 'no server is selected, please select a server in the top left';
    } else if (!props.server.alreadyJoined) {
        message = 'the bot is currently not setup in your server jet, click on setup bot to get the bot in your server. after finishing that prompt, please click on the finish button next to it.';
        showAddBotButton = true;
    }

    return (
        <StyledBackground>
            {message && (
                <p>{message}</p>
            )}
            {showAddBotButton && (
                <React.Fragment>
                    {addBotButton}
                    <p>When finished with Setup bot, click on finish:</p>
                    {finishButton}
                </React.Fragment>
            )}
        </StyledBackground>
    );
};

export default (ItemDisplay);
