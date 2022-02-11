import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IComponentServerSettings } from '../../../../interfaces/api/Component';
import { IFullModuleWithData } from '../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import { IEditServerData } from '../../../../store/server/Sagas';
import Plugin from './Plugin';


const StyledBackground = styled.div`
    //background-color: #1F2129;
    //width: calc(100% - 100px);
    //height: calc(100% - 100px);
    //margin: 50px;
    //overflow-y: auto;
    //border-radius: 5px;
    //
    //::-webkit-scrollbar {
    //    width: 6px;
    //    padding: 3px
    //}
    //
    //::-webkit-scrollbar-thumb {
    //    background-color: #43464D;
    //}
`;

type Props = {
    modules: IFullModuleWithData[];
    detailedServer: IDetailedServer;
    onComponentEnabledChange: (event: IEditServerData) => void;
    onComponentSettingChange: (data: IEditServerData) => void;
};

const PluginBody: React.FC<Props> = (props: Props) => {
    let params = useParams();

    return (
        <StyledBackground>
            {params.pluginId && params.moduleId && props.modules ? (
                <Plugin moduleId={params.moduleId}
                    pluginId={params.pluginId}
                    modules={props.modules}
                    detailedServer={props.detailedServer}
                    onComponentEnabledChange={props.onComponentEnabledChange}
                    onComponentSettingChange={props.onComponentSettingChange}
                />
            ) : (
                <p>works</p>
            )}
        </StyledBackground>

    );
};

export default (PluginBody);
