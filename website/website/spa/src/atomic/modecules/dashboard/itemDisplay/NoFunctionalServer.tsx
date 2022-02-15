import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IServer } from '../../../../interfaces/api/Server';
import { MapStateToProps } from '../../../../store';
import { AuthStoreState } from '../../../../store/auth';
import { websiteStoreState } from '../../../../store/website';
import { Button } from '@mui/material';


type HeaderProps = {
    server?: IServer;
    currentServerId?: string;
};

type Props = HeaderProps & websiteStoreState;

const NoFunctionalServer: React.FC<Props> = (props: Props) => {
    const addBotButton = <Button
        variant="text"
        color="secondary"
        onClick={() => {
            window.open('https://discord.com/api/oauth2/authorize?client_id=794964425819160587&permissions=2080374975&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fserver%2Fredirect&scope=bot%20applications.commands&guild_id=' + props.currentServerId, '_blank');
        }}
    >
        {getItemTranslate(props.language.key, 'BOT_SETUP_BUTTON')}
    </Button>;
    const finishButton = <Button
        variant="text"
        color="secondary"
        onClick={() => {
            window.location.reload();
        }}
    >
        {getItemTranslate(props.language.key, 'FINISH')}
    </Button>;
    let message: string | undefined;
    let showAddBotButton: boolean = false;

    if (props.server === undefined) {
        message = getItemTranslate(props.language.key, 'NO_SERVER_SELECTED');;
    } else if (!props.server.alreadyJoined) {
        message = getItemTranslate(props.language.key, 'BOT_NOT_SETUP');
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
                    <p>{getItemTranslate(props.language.key, 'WHEN_FINISHED_BOT_SETUP')}</p>
                    {finishButton}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        language: state.website.language,
    };
};

export default connect(mapStateToProps)(NoFunctionalServer);

