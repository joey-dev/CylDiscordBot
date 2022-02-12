import { getItemTranslate } from '@cylbot/cyldiscordbotlanguage/index';
import { QuestionMark } from '@mui/icons-material';
import { Autocomplete, AutocompleteRenderInputParams, IconButton, Switch, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IComponentServerSettings } from '../../../../../../interfaces/api/Component';
import { IDetailedServer } from '../../../../../../interfaces/api/Server';
import CapitalizeFirstLetter from '../../../../../../services/stringManipulation/CapitalizeFirstLetter';
import { MapStateToProps } from '../../../../../../store';
import { ServerStoreState } from '../../../../../../store/server';
import { getServerChannelsStart } from '../../../../../../store/server/Action';
import Text from '../../../../../atoms/text/Text';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

export interface IChannelData {
    channels: IChannelsData[];
}

export interface IChannelsData {
    id: string;
    name: string;
}

type ChannelSettingsProps = {
    settings: IComponentServerSettings;
    detailedServer: IDetailedServer;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
    isModalOpen: boolean;
};

type DispatchProps = {
    getServerChannelsStart: (serverId: string) => void,
};

type Props = ChannelSettingsProps & DispatchProps & ServerStoreState;

const ChannelSetting: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw new Error('data for channel settings is incorrect!');
    }

    const [selectedChannels, setSelectedChannels] = useState<IChannelsData[]>([]);
    const params = useParams();

    useEffect(() => {
        if (props.isModalOpen) {
            getChannels();
        }
    }, [props.isModalOpen]);

    useEffect(() => {
        if ('channels' in props.settings.data) {
            setSelectedChannels(props.settings.data.channels);
        }
    }, [props.settings.data]);

    const getChannels = (): void => {
        if (params.serverId) {
            props.getServerChannelsStart(params.serverId);
        }
    };

    const languageName = props.detailedServer.language.small_name;
    const channelsName = getItemTranslate(languageName, 'CHANNELS');
    const channelsSwitchDescription = getItemTranslate(languageName, 'SETTINGS_CHANNELS_TITLE');
    const channelsSwitchDetailedDescription = getItemTranslate(languageName, 'SETTINGS_CHANNELS_DESCRIPTION');
    const enabledName = CapitalizeFirstLetter(getItemTranslate(languageName, 'ENABLED'));
    const disabledName = CapitalizeFirstLetter(getItemTranslate(languageName, 'DISABLED'));


    return (
        <StyledSetting>
            <Text small={true}
                float="left"
            >{channelsSwitchDescription}</Text>
            <Tooltip title={channelsSwitchDetailedDescription}>
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
            <Text small={true}>{props.settings.turned_on ? enabledName : disabledName} {channelsName}:</Text>
            <StyledAutoComplete>
                <Autocomplete
                    disablePortal
                    disableCloseOnSelect
                    options={getValueForAutoCompleteFromChannels(props.channels)}
                    id="combo-box-demo"
                    size="small"
                    multiple
                    sx={{width: '100%'}}
                    renderInput={(renderInputParams: AutocompleteRenderInputParams) =>
                        <TextField color="info" {...renderInputParams}
                            label={channelsName}
                        />}
                    onOpen={() => getChannels()}
                    onClose={() => {
                        props.onComponentSettingChange(
                            {
                                ...props.settings,
                                ...{data: editChannelData(props.settings.data, selectedChannels)},
                            },
                        );
                    }}
                    onChange={(event, value, reason) => {
                        const fullChannels = getValueForChannelsFromAutoComplete(value, props.channels);
                        setSelectedChannels(fullChannels);
                        if (reason === 'clear') {
                            props.onComponentSettingChange(
                                {
                                    ...props.settings,
                                    ...{data: editChannelData(props.settings.data, [])},
                                },
                            );
                        } else if (reason === 'removeOption') {
                            props.onComponentSettingChange(
                                {
                                    ...props.settings,
                                    ...{data: editChannelData(props.settings.data, fullChannels)},
                                },
                            );
                        }
                    }}
                    value={getValueForAutoCompleteFromChannels(selectedChannels)}
                />
            </StyledAutoComplete>
        </StyledSetting>
    );
};

const hasCorrectData = (data: object): boolean => 'channels' in data;

const getValueForAutoCompleteFromChannels = (channels: IChannelsData[] | undefined): string[] => {
    if (!channels || channels.length === 0) {
        return [];
    }

    const returnValue: string[] = [];
    channels.forEach(channel => {
        returnValue.push(channel.name);
    });

    if (returnValue.length === 0) {
        return [];
    }

    return returnValue;
};

const getValueForChannelsFromAutoComplete = (channels: string[], allChannels: IChannelsData[] | undefined): IChannelsData[] => {
    if (!allChannels || channels.length === 0) {
        return [];
    }

    const returnValue: IChannelsData[] = [];

    channels.forEach(channel => {
        const foundChannel = allChannels.find(allChannel => allChannel.name === channel);
        if (foundChannel) {
            returnValue.push(foundChannel);
        }
    });

    return returnValue;
};

const editChannelData = (data: object, channels: IChannelsData[]): object => {
    data = {
        ...data,
        channels: channels,
    };

    return data;
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        channels: state.server.channels,
    };
};

type DispatchPropsArgs = {
    type: string;
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        getServerChannelsStart: (serverId: string) => dispatch(getServerChannelsStart(serverId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSetting);
