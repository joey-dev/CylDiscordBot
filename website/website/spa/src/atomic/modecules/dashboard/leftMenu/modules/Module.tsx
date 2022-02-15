import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import React from 'react';
import styled from 'styled-components';
import { IFullModuleWithData } from '../../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../../store/server/Sagas';
import Title from '../../../../atoms/text/Title';
import Plugin from './Plugin';


const StyledDiv = styled.div`
`;

type Props = {
    data: IFullModuleWithData;
    onPluginEnabledChange: (event: IEditServerData) => void;
    detailedServer: IDetailedServer;
};

const Module: React.FC<Props> = (props: Props) => {
    const languageName = props.detailedServer.language.small_name;

    return (
        <React.Fragment>
            <Title small={true}>{getItemTranslate(languageName, props.data.name).toUpperCase()}</Title>
            {props.data.plugins.map(plugin =>
                <Plugin key={plugin.id}
                    detailedServer={props.detailedServer}
                    data={plugin}
                    onPluginEnabledChange={props.onPluginEnabledChange}
                    moduleId={props.data.id}
                />,
            )}
        </React.Fragment>
    );
};

export default Module;
