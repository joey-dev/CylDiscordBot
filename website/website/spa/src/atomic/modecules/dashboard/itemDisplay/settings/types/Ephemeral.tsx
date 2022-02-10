import { QuestionMark } from '@mui/icons-material';
import { IconButton, Switch, Tooltip } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { IComponentServerSettings } from '../../../../../../interfaces/api/Component';
import { ServerStoreState } from '../../../../../../store/server';
import Text from '../../../../../atoms/text/Text';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

type Props = {
    settings: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

const Ephemeral: React.FC<Props> = (props: Props) => {
    const EphemeralSwitchDescription = 'Send bot reply to user only?';
    const EphemeralSwitchDetailedDescription = 'When enabled, when a user types out a command, the bot reply will only be visible to the user that typed the command out. ' +
        'When disabled the bot reply will be visible for everyone. ' +
        '(This only works when the users uses it with a slash command, not with only the prefix)';


    return (
        <StyledSetting>
            <Text small={true}
                float="left"
            >{EphemeralSwitchDescription}</Text>
            <Tooltip title={EphemeralSwitchDetailedDescription}>
                <IconButton sx={{width: '20px', float: 'left'}}>
                    <QuestionMark sx={{width: '20px'}} />
                </IconButton>
            </Tooltip>
            <StyledSwitch>
                <Switch
                    name="enabled"
                    onChange={() => (
                        props.onComponentSettingChange(
                            {...props.settings, ...{turned_on: !props.settings.turned_on}},
                        )
                    )}
                    checked={props.settings.turned_on}
                    edge="end"
                    color="info"
                />
            </StyledSwitch>
        </StyledSetting>
    );
};


export default Ephemeral;
