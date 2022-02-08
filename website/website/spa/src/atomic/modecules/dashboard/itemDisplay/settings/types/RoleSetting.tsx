import { QuestionMark } from '@mui/icons-material';
import { Autocomplete, AutocompleteRenderInputParams, IconButton, Switch, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IComponentServerSettings } from '../../../../../../interfaces/api/Component';
import { MapStateToProps } from '../../../../../../store';
import { ServerStoreState } from '../../../../../../store/server';
import { getServerRolesStart } from '../../../../../../store/server/Action';
import { IEditServerData } from '../../../../../../store/server/Sagas';
import Text from '../../../../../atoms/text/Text';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

export interface IRoleData {
    roles: IRolesData[];
}

export interface IRolesData {
    id: string;
    name: string;
}

type RoleSettingsProps = {
    settings: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
};

type DispatchProps = {
    getServerRolesStart: (serverId: string) => void,
};

type Props = RoleSettingsProps & DispatchProps & ServerStoreState;

const RoleSetting: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw 'data for role settings is incorrect!';
    }

    const [selectedRoles, setSelectedRoles] = useState<IRolesData[]>([]);
    const [serverId, setServerId] = useState<string>();
    let params = useParams();


    useEffect(() => {
        if ('roles' in props.settings.data) {
            setSelectedRoles(props.settings.data.roles);
        }
    }, [props.settings.data]);

    useEffect(() => {
        setServerId(params.serverId);
    }, [params]);

    const getRoles = (): void => {
        if (serverId) {
            props.getServerRolesStart(serverId);
        }
    };

    const rolesName = 'Roles';
    const rolesSwitchDescription = 'Disable or enable some roles?';
    const rolesSwitchDetailedDescription = 'When enabled, any role that is not in the list will not be able to use the command. ' +
        'When disabled any roles that are in the list will not be able to use that command.';
    const enabledName = 'Enabled';
    const disabledName = 'Disabled';


    return (
        <StyledSetting>
            <Text small={true}
                float="left"
            >{rolesSwitchDescription}</Text>
            <Tooltip title={rolesSwitchDetailedDescription}>
                <IconButton sx={{width: '20px', float: 'left'}}>
                    <QuestionMark sx={{width: '20px'}} />
                </IconButton>
            </Tooltip>
            <StyledSwitch>
                <Switch
                    name="enabled"
                    onChange={() => (props.onComponentSettingChange({...props.settings, ...{turned_on: !props.settings.turned_on}}))}
                    checked={props.settings.turned_on}
                    edge="end"
                    color="info"
                />
            </StyledSwitch>
            <Text small={true}>{props.settings.turned_on ? enabledName : disabledName} {rolesName}:</Text>
            <StyledAutoComplete>
                <Autocomplete
                    disablePortal
                    disableCloseOnSelect
                    options={getValueForAutoCompleteFromRoles(props.roles)}
                    id="combo-box-demo"
                    size="small"
                    multiple
                    sx={{width: '100%'}}
                    renderInput={(params: AutocompleteRenderInputParams) => <TextField color="info" {...params}
                        label={rolesName}
                    />}
                    onOpen={() => getRoles()}
                    onClose={() => {
                        props.onComponentSettingChange(
                            {
                                ...props.settings,
                                ...{data: editRoleData(props.settings.data, selectedRoles)},
                            },
                        );
                    }}
                    onChange={(event, value, reason) => {
                        const fullRoles = getValueForRolesFromAutoComplete(value, props.roles);
                        setSelectedRoles(fullRoles);
                        if (reason === 'clear') {
                            props.onComponentSettingChange(
                                {
                                    ...props.settings,
                                    ...{data: editRoleData(props.settings.data, [])},
                                },
                            );
                        } else if (reason === 'removeOption') {
                            props.onComponentSettingChange(
                                {
                                    ...props.settings,
                                    ...{data: editRoleData(props.settings.data, fullRoles)},
                                },
                            );
                        }
                    }}
                    value={getValueForAutoCompleteFromRoles(selectedRoles)}
                />
            </StyledAutoComplete>
        </StyledSetting>
    );
};

const hasCorrectData = (data: object): boolean => 'roles' in data;

const getValueForAutoCompleteFromRoles = (roles: IRolesData[]|undefined): string[] => {
    if (!roles || roles.length === 0) {
        return [];
    }

    const returnValue: string[] = [];
    roles.forEach(role => {
        returnValue.push(role.name);
    });

    if (returnValue.length === 0) {
        return [];
    }

    return returnValue;
};

const getValueForRolesFromAutoComplete = (roles: string[], allRoles: IRolesData[]|undefined): IRolesData[] => {
    if (!allRoles || roles.length === 0) {
        return [];
    }

    const returnValue: IRolesData[] = [];

    roles.forEach(role => {
        const foundRole = allRoles.find(allRole => allRole.name === role);
        if (foundRole) {
            returnValue.push(foundRole);
        }
    });

    return returnValue;
};

const editRoleData = (data: object, roles: IRolesData[]): object => {
    data = {
        ...data,
        roles: roles,
    };

    return data;
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        roles: state.server.roles,
    };
};

type DispatchPropsArgs = {
    type: string;
    isSignUp?: boolean;
    path?: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        getServerRolesStart: (serverId: string) => dispatch(getServerRolesStart(serverId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleSetting);
