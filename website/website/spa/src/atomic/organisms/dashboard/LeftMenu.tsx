import React, { useState } from 'react';
import styled from 'styled-components';
import { IDetailedServer, IServer } from '../../../interfaces/api/Server';
import ModuleList from '../../modecules/dashboard/leftMenu/modules/ModuleList';
import ServerItems from '../../modecules/dashboard/leftMenu/server/ServerItems';


const StyledBackground = styled.div`
    display: block;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    background-color: #1F2129;
    color: white;
    height: 100%;
    overflow-y: auto;
    
    ::-webkit-scrollbar {
        width: 0;
    }
`;

const StyledInnerBackground = styled.div`
    padding: 24px 20px 20px;
`;

type Props = {
    servers: IServer[];
    currentServerId?: string;
    server?: IDetailedServer;
};

const LeftMenu: React.FC<Props> = (props: Props) => {
    const [changedModule, setChangedModule] = useState(false);
    const [modules, setModules] = useState([
        {
            "id": 1,
            "name": "other",
            "plugins": [
                {
                    "id": 1,
                    "name": "utility",
                    "order_id": 1,
                    "turned_on": true,
                    "components": [
                        {
                            "id": 1,
                            "name": "ping",
                            "order_id": 5,
                            "data": "{}",
                            "type": "command"
                        }
                    ]
                }
            ]
        }
    ]);

    const onPluginEnabledChange = (event: SwitchOnChange): void => {
        let newModule = modules;

        modules.forEach((module, moduleIndex) => {
            if (module.id === event.module_id) {
                module.plugins.forEach((plugin, pluginIndex) => {
                    if (plugin.id === event.plugin_id) {
                        newModule[moduleIndex].plugins[pluginIndex].turned_on = event.checked;
                        setModules(newModule);
                        setChangedModule(!changedModule);
                    }
                });
            }
        });
    }

    return (
        <StyledBackground>
            <StyledInnerBackground>
                <ServerItems servers={props.servers}
                    currentServerId={props.currentServerId}
                    server={props.server}
                />
                <ModuleList modules={modules} onPluginEnabledChange={onPluginEnabledChange} />
            </StyledInnerBackground>
        </StyledBackground>
    );
};


export type SwitchOnChange = {
    module_id?: number;
    plugin_id: number;
    checked: boolean;
    type: 'module' | 'plugin' | 'component';
};

export default (LeftMenu);
