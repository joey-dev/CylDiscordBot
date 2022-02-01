import React from 'react';
import styled from 'styled-components';
import { IFullModuleWithData } from '../../../../interfaces/api/Module';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import Text from '../../../atoms/text/Text';
import Component from './Component';


const StyledBackground = styled.div`
    border-bottom: white 1px solid;
    margin-bottom: 25px;
    padding-bottom: 10px;
    margin-right: 100px;
`;

type Props = {
    pluginName: string
};

const PluginHeader: React.FC<Props> = (props: Props) => {

    return (
        <StyledBackground>
            <Text color="white" large={true} margin={'50px 0 0'} padding={'0'}>
                {props.pluginName}
            </Text>
        </StyledBackground>
    );
};

export default (PluginHeader);
