import React from 'react';
import styled from 'styled-components';
import { IComponentSettings, IComponentServerSettings } from '../../../../../interfaces/api/Component';
import RoleSetting from './types/RoleSetting';


const StyledSetting = styled.div`
`;

type Props = {
    data: IComponentSettings;
    serverData: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {
    let returnElement;

    switch (props.data.name) {
        case 'role':
            returnElement = <RoleSetting settings={props.serverData} onComponentSettingChange={props.onComponentSettingChange} loading={false}/>;
            break;
        default:
            throw new Error('data name not found in ComponentSettings');
    }

    return (
        returnElement
    );
};


export default (ComponentSettings);
