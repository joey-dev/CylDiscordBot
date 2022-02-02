import { Button, Switch } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IFullComponentWithData } from '../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../store/server/Sagas';
import Text from '../../../atoms/text/Text';
import ComponentSettings from './ComponentSettings';


const StyledBackground = styled.div`
    background-color: #1F2129;
    width: calc(100% - 150px);
    margin: 0 0 20px;;
    border-radius: 5px;
    display: grid;
    align-items: center;
    padding: 0 25px;
`;

const StyledLeftDiv = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
`;

const StyledRightDiv = styled.div`
    float: right;
    grid-column-start: 4;
    text-align: right;
`;

type Props = {
    component: IFullComponentWithData;
    detailedServer: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
};

const Component: React.FC<Props> = (props: Props) => {
    const [componentSettingsOpen, setComponentSettingsOpen] = useState(false);

    let componentName = '';
    if (props.component.type === 'command') {
        componentName += props.detailedServer.command_prefix;
    }

    componentName += props.component.name;

    return (
        <StyledBackground>
            <StyledLeftDiv>
                <Text margin={'0'}
                    padding={'15px 0px'}
                    color="white"
                >
                    {componentName}
                </Text>
                <Text margin={'0'}
                    padding={'0px 0px 15px'}
                    color="darkGrey"
                    small={true}
                >
                    this is the description
                </Text>
            </StyledLeftDiv>
            <StyledRightDiv>
                <Button variant="outlined"
                    color="secondary"
                    onClick={() => setComponentSettingsOpen(true)}
                >
                    edit
                </Button>
                <ComponentSettings open={componentSettingsOpen}
                    onClose={() => setComponentSettingsOpen(false)}
                    component={props.component}
                />
                <Switch
                    name="enabled"
                    edge="end"
                    color="info"
                    checked={props.component.turned_on}
                    onChange={event => props.onComponentEnabledChange({
                        checked: event.target.checked,
                        component_id: props.component.id,
                        type: 'component',
                    })}
                />
            </StyledRightDiv>
        </StyledBackground>
    );
};


export default (Component);
