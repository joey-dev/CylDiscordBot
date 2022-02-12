import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { IconButton, Switch, Tooltip } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { IComponentServerSettings } from '../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../interfaces/api/Server';
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
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

const Ephemeral: React.FC<Props> = (props: Props) => {
    const languageName = props.detailedServer.language.small_name;
    const EphemeralSwitchDescription = getItemTranslate(languageName, 'SETTINGS_EPHEMERAL_TITLE');
    const EphemeralSwitchDetailedDescription = getItemTranslate(languageName, 'SETTINGS_EPHEMERAL_DESCRIPTION');


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
