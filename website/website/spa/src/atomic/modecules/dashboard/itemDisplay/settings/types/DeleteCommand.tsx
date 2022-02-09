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

const DeleteCommand: React.FC<Props> = (props: Props) => {
    const deleteCommandsSwitchDescription = 'Delete command after bot reply?';
    const deleteCommandsSwitchDetailedDescription = 'When enabled, when a user types out a command, their command message will be removed when the bot gives its reply. ' +
        'When disabled the command the user typed out will stay in chat.';


    return (
        <StyledSetting>
            <Text small={true}
                float="left"
            >{deleteCommandsSwitchDescription}</Text>
            <Tooltip title={deleteCommandsSwitchDetailedDescription}>
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


export default DeleteCommand;
