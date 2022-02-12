import React from 'react';
import styled from 'styled-components';
import { IFullModuleWithData } from '../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../store/server/Sagas';
import Component from './Component';
import PluginHeader from './PluginHeader';


const StyledBackground = styled.div`
    margin-left: 50px;
`;

type Props = {
    pluginId: string;
    moduleId: string;
    modules: IFullModuleWithData[];
    detailedServer: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const Plugin: React.FC<Props> = (props: Props) => {
    const module = props.modules.find(moduleItem => moduleItem.id === parseInt(props.moduleId));
    let plugin;

    if (module) {
        plugin = module.plugins.find(pluginItem => pluginItem.id === parseInt(props.pluginId));
    }

    return (
        <React.Fragment>
            {plugin && (
                <StyledBackground>
                    <PluginHeader pluginName={plugin.name}
                        detailedServer={props.detailedServer}
                    />
                    {plugin.components.map(component =>
                        <Component key={component.id}
                            component={component}
                            detailedServer={props.detailedServer}
                            onComponentEnabledChange={props.onComponentEnabledChange}
                            onComponentSettingChange={props.onComponentSettingChange}
                        />,
                    )}
                </StyledBackground>
            )}
        </React.Fragment>
    );
};

export default (Plugin);
