import { Switch } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { IFullPluginWithData } from '../../../../../interfaces/api/Plugin';
import Icon from '../../../../atoms/images/Icon';
import Text from '../../../../atoms/text/Text';
import { SwitchOnChange } from '../../../../organisms/dashboard/LeftMenu';


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
    onPluginEnabledChange: (event: SwitchOnChange) => void;
};

const Plugin: React.FC<Props> = (props: Props) => {
    return (
        <StyledDiv>
            <Icon name="utility"
                float={'left'}
            />
            <Text margin={'20px 40px'}>
                {props.data.name}
            </Text>
            <StyledSwitchDiv>
                <Switch
                    name="enabled"
                    onChange={event => props.onPluginEnabledChange({
                        checked: event.target.checked,
                        plugin_id: props.data.id,
                        type: 'plugin'
                    })}
                    checked={props.data.turned_on}
                    edge="end"
                />
            </StyledSwitchDiv>
        </StyledDiv>
    );
};


export default Plugin;
