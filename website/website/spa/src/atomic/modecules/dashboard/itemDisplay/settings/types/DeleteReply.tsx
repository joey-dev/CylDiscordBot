import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { Autocomplete, AutocompleteRenderInputParams, IconButton, Switch, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IComponentServerSettings } from '../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../interfaces/api/Server';
import Text from '../../../../../atoms/text/Text';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

export interface IDeleteReplyData {
    second: string;
}

type Props = {
    settings: IComponentServerSettings;
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

const DeleteReply: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw new Error('data for delete reply settings is incorrect!');
    }

    const [selectedSecond, setSelectedSecond] = useState<string>();

    useEffect(() => {
        if ('second' in props.settings.data) {
            setSelectedSecond(props.settings.data.second);
        }
    }, [props.settings.data]);


    const languageName = props.detailedServer.language.small_name;
    const deleteReplySecondsLabel = getItemTranslate(languageName, 'SETTINGS_DELETE_REPLY_TITLE');
    const deleteReplySwitchDescription = getItemTranslate(languageName, 'SETTINGS_DELETE_REPLY_DESCRIPTION');
    const deleteReplySwitchDetailedDescription = getItemTranslate(languageName, 'SETTINGS_DELETE_REPLY_SECONDS');
    const secondsAUserCanChoose = 10;
    const numberOptions = Array(secondsAUserCanChoose).fill(1).map((x, y) => (x + y).toString());


    return (
        <StyledSetting>
            <Text small={true}
                float="left"
            >{deleteReplySwitchDescription}</Text>
            <Tooltip title={deleteReplySwitchDetailedDescription}>
                <IconButton sx={{width: '20px', float: 'left'}}>
                    <QuestionMark sx={{width: '20px'}} />
                </IconButton>
            </Tooltip>
            <StyledSwitch>
                <Switch
                    name="enabled"
                    onChange={() => (
                        props.onComponentSettingChange(
                            {...props.settings, ...{turned_on: !props.settings.turned_on}},
                        )
                    )}
                    checked={props.settings.turned_on}
                    edge="end"
                    color="info"
                />
            </StyledSwitch>
            <StyledAutoComplete>
                <Autocomplete
                    disablePortal
                    disableCloseOnSelect
                    options={numberOptions}
                    id="combo-box-demo"
                    size="small"
                    sx={{width: '100%'}}
                    renderInput={(renderInputParams: AutocompleteRenderInputParams) =>
                        <TextField color="info" {...renderInputParams}
                            label={deleteReplySecondsLabel}
                        />}
                    onClose={() => {
                        props.onComponentSettingChange(
                            {
                                ...props.settings,
                                ...{
                                    data: {
                                        second: selectedSecond,
                                    },
                                },
                            },
                        );
                    }}
                    onChange={(event, value) => {
                        setSelectedSecond(value);
                    }}
                    value={getValueForAutoCompleteFromChannels(selectedSecond)}
                />
            </StyledAutoComplete>
        </StyledSetting>
    );
};
const hasCorrectData = (data: object): boolean => 'second' in data;
const getValueForAutoCompleteFromChannels = (second: string | undefined): string | null => {
    if (second) {
        return second;
    }
    return null;
};

export default DeleteReply;
