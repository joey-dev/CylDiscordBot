import { getItemTranslate, ILanguage } from '@cylbot/cyldiscordbotlanguage/index';
import React from 'react';
import styled from 'styled-components';
import { IDetailedServer } from '../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../services/stringManipulation/CapitalizeFirstLetter';
import Text from '../../../atoms/text/Text';


const StyledBackground = styled.div`
    border-bottom: white 1px solid;
    margin-bottom: 25px;
    padding-bottom: 10px;
    margin-right: 100px;
`;

type Props = {
    pluginName: keyof ILanguage;
    detailedServer: IDetailedServer;
};

const PluginHeader: React.FC<Props> = (props: Props) => {
    const languageName = props.detailedServer.language.small_name;

    return (
        <StyledBackground>
            <Text color="white"
                large={true}
                margin={'50px 0 0'}
                padding={'0'}
            >
                {CapitalizeFirstLetter(getItemTranslate(languageName, props.pluginName))}
            </Text>
        </StyledBackground>
    );
};

export default (PluginHeader);
