import React from 'react';
import styled from 'styled-components';
import { IFullModuleWithData } from '../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import Component from './Component';


const StyledBackground = styled.div`

`;

type Props = {
    pluginId: string;
    moduleId: string;
    modules: IFullModuleWithData[];
};

const Plugin: React.FC<Props> = (props: Props) => {
    let module = props.modules.find(module => module.id === parseInt(props.moduleId));
    let plugin;

    if (module) {
        plugin = module.plugins.find(plugin => plugin.id === parseInt(props.pluginId));
    }

    return (
        <React.Fragment>
            {plugin && (
                <StyledBackground>
                    {plugin.components.map(component =>
                        <Component key={component.id} component={component} />
                    )}
                </StyledBackground>
            )}
        </React.Fragment>
    );
};

export default (Plugin);
