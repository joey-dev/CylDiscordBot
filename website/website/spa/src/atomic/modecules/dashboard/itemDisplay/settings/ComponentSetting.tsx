import React from 'react';
import { IComponentServerSettings, IComponentSettings } from '../../../../../interfaces/api/Component';
import ChannelSetting from './types/ChannelSetting';
import RoleSetting from './types/RoleSetting';


type Props = {
    data: IComponentSettings;
    serverData: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {
    let returnElement;

    switch (props.data.name) {
        case 'role':
            returnElement = <RoleSetting settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                loading={false}
                isModalOpen={props.isModalOpen}
            />;
            break;
        case 'channel':
            returnElement = <ChannelSetting settings={props.serverData}
                onComponentSettingChange={props.onComponentSettingChange}
                loading={false}
                isModalOpen={props.isModalOpen}
            />;
            break;
        default:
            throw new Error('data name not found in ComponentSettings');
    }

    return (
        returnElement
    );
};


export default (ComponentSettings);
