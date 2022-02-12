import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import React from 'react';
import styled from 'styled-components';
import { IServer } from '../../../../interfaces/api/Server';
import Button from '../../../atoms/buttons/Button/Button';


type Props = {
    server?: IServer;
    currentServerId?: string;
};

const NoFunctionalServer: React.FC<Props> = (props: Props) => {
    const addBotButton = <Button type="button"
        onClick={() => {
            window.open('https://discord.com/api/oauth2/authorize?client_id=794964425819160587&permissions=2080374975&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fserver%2Fredirect&scope=bot%20applications.commands&guild_id=' + props.currentServerId, '_blank');
        }}
    >
        {getItemTranslate('enUS', 'BOT_SETUP_BUTTON')}
    </Button>;
    const finishButton = <Button type="button"
        onClick={() => {
            window.location.reload();
        }}
    >
        {getItemTranslate('enUS', 'FINISH')}
    </Button>;
    let message: string | undefined;
    let showAddBotButton: boolean = false;

    if (props.server === undefined) {
        message = getItemTranslate('enUS', 'NO_SERVER_SELECTED');;
    } else if (!props.server.alreadyJoined) {
        message = getItemTranslate('enUS', 'BOT_NOT_SETUP');
        showAddBotButton = true;
    }

    return (
        <React.Fragment>
            {message && (
                <p>{message}</p>
            )}
            {showAddBotButton && (
                <React.Fragment>
                    {addBotButton}
                    <p>${getItemTranslate('enUS', 'WHEN_FINISHED_BOT_SETUP')}</p>
                    {finishButton}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default (NoFunctionalServer);
