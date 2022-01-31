import React from 'react';
import styled from 'styled-components';
import { IFullModuleWithData } from '../../../../../interfaces/api/Module';
import { IEditServerData } from '../../../../../store/server/Sagas';
import Title from '../../../../atoms/text/Title';
import Plugin from './Plugin';


const StyledDiv = styled.div`
`;

type Props = {
    data: IFullModuleWithData;
    onPluginEnabledChange: (event: IEditServerData) => void;
};

const Module: React.FC<Props> = (props: Props) => {
    return (
        <React.Fragment>
            <Title small={true}>{props.data.name}</Title>
            {props.data.plugins.map(plugin =>
                <Plugin key={plugin.id}
                    data={plugin}
                    onPluginEnabledChange={props.onPluginEnabledChange}
                />,
            )}
        </React.Fragment>
    );
};

export default Module;
