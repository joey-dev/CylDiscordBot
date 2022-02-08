import { QuestionMark } from '@mui/icons-material';
import { Autocomplete, AutocompleteRenderInputParams, IconButton, Switch, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IComponentServerSettings } from '../../../../../../interfaces/api/Component';
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

interface IRolesData {
    id: string;
    name: string;
}

type Props = {
    settings: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
};

const RoleSetting: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw 'data for role settings is incorrect!';
    }

    const [selectedRoles, setSelectedRoles] = useState<IRolesData[]>([]);

    useEffect(() => {
        if ('roles' in props.settings.data) {
            setSelectedRoles(props.settings.data.roles);
        }
    }, [props.settings.data]);


    const roles = [
        {
            name: 'Cyl',
            id: '795033292083822643',
        },
        {
            name: 'adminRole',
            id: '795749571967582218',
        },
        {
            name: 'serverCommand',
            id: '795969565167321118',
        },
        {
            name: 'welcome',
            id: '796025329696899072',
        },
    ];

    const description = 'When enabled, any role that is not in the list will not be able to use the command. ' +
        'When disabled any roles that are in the list will not be able to use that command.';


    return (
        <StyledSetting>
            <Text small={true}
                float="left"
            >Disable or enable some roles?</Text>
            <Tooltip title={description}>
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
            <Text small={true}>{props.settings.turned_on ? 'enabled' : 'disabled'} roles:</Text>
            <StyledAutoComplete>
                <Autocomplete
                    disablePortal
                    disableCloseOnSelect
                    options={getValueForAutoCompleteFromRoles(roles)}
                    id="combo-box-demo"
                    size="small"
                    multiple
                    sx={{width: '100%'}}
                    renderInput={(params: AutocompleteRenderInputParams) => <TextField color="info" {...params}
                        label="Roles"
                    />}
                    onClose={() => {
                        props.onComponentSettingChange(
                            {
                                ...props.settings,
                                ...{data: editRoleData(props.settings.data, selectedRoles)},
                            },
                        );
                    }}
                    onChange={(event, value, reason) => {
                        const fullRoles = getValueForRolesFromAutoComplete(value, roles);
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

const getValueForAutoCompleteFromRoles = (roles: IRolesData[]): string[] => {
    if (roles.length === 0) {
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

const getValueForRolesFromAutoComplete = (roles: string[], allRoles: IRolesData[]): IRolesData[] => {
    if (roles.length === 0) {
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

// const mapStateToProps = (state: MapStateToProps) => {
//     return {
//         roles: state.server.roles,
//     };
// };
//
// type DispatchPropsArgs = {
//     type: string;
//     isSignUp?: boolean;
//     path?: string;
// };
//
// const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
//     return {
//         getServerRolesStart: () => dispatch(setServerRolesStart()),
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(RoleSetting);
export default RoleSetting;
