import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { Switch } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IFullPluginWithData } from '../../../../../interfaces/api/Plugin';
import { IDetailedServer } from '../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../services/stringManipulation/CapitalizeFirstLetter';
import { IEditServerData } from '../../../../../store/server/Sagas';
import Icon from '../../../../atoms/images/Icon';
import Text from '../../../../atoms/text/Text';


const StyledDiv = styled.div`
    text-align: left;
`;

const StyledSwitchDiv = styled.div`
    float: right;
    position: relative;
    top: -52px;
`;

type Props = {
    data: IFullPluginWithData;
    detailedServer: IDetailedServer;
    onPluginEnabledChange: (event: IEditServerData) => void;
    moduleId: number;
};

const Plugin: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const params = useParams();
    const currentServerId = params.serverId;
    const languageName = props.detailedServer.language.small_name;


    const navigateToPlugin = () => navigate(`/dashboard/${currentServerId}/${props.moduleId}/${props.data.id}`);

    return (
        <StyledDiv>
            <Icon name="utility"
                float={'left'}
            />
            <Text margin={'20px 40px'}
                onClick={navigateToPlugin}
            >
                {CapitalizeFirstLetter(getItemTranslate(languageName, props.data.name))}
            </Text>
            <StyledSwitchDiv>
                <Switch
                    name="enabled"
                    onChange={event => props.onPluginEnabledChange({
                        checked: event.target.checked,
                        plugin_id: props.data.id,
                        type: 'plugin',
                    })}
                    checked={props.data.turned_on}
                    edge="end"
                    color="info"
                />
            </StyledSwitchDiv>
        </StyledDiv>
    );
};


export default Plugin;
