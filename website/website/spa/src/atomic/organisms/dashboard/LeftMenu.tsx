import React from 'react';
import styled from 'styled-components';
import { IFullModuleWithData } from '../../../interfaces/api/Module';
import { IDetailedServer, IServer } from '../../../interfaces/api/Server';
import { IEditServerData } from '../../../store/server/Sagas';
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
    modules?: IFullModuleWithData[];
    onPluginEnabledChange: (event: IEditServerData) => void;
};

const LeftMenu: React.FC<Props> = (props: Props) => {
    return (
        <StyledBackground>
            <StyledInnerBackground>
                <ServerItems servers={props.servers}
                    currentServerId={props.currentServerId}
                    server={props.server}
                />
                {(props.server !== undefined && props.modules !== undefined) && (
                    <ModuleList server={props.server}
                        modules={props.modules}
                        onPluginEnabledChange={props.onPluginEnabledChange}
                    />
                )}
            </StyledInnerBackground>
        </StyledBackground>
    );
};

export default (LeftMenu);
