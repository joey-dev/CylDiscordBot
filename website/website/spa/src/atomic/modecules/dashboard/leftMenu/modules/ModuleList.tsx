import React from 'react';
import styled from 'styled-components';
import { IFullModuleWithData } from '../../../../../interfaces/api/Module';
import { SwitchOnChange } from '../../../../organisms/dashboard/LeftMenu';
import Module from './Module';


const StyledDiv = styled.div`
    margin-top: 10px;
`;

type Props = {
    modules: IFullModuleWithData[];
    onPluginEnabledChange: (event: SwitchOnChange) => void;
};

const ModuleList: React.FC<Props> = (props: Props) => {
    return (
        <React.Fragment>
            {props.modules.map(module =>
                <Module key={module.id}
                    data={module}
                    onPluginEnabledChange={event => props.onPluginEnabledChange({module_id: module.id, ...event})}
                />,
            )}
        </React.Fragment>
    );
};


export default ModuleList;
