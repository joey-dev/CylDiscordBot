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
    roles: string[];
    roles1: string[];
}

type Props = {
    settings: IComponentServerSettings;
    onComponentSettingChange: (data: IComponentServerSettings) => void;
};

const RoleSetting: React.FC<Props> = (props: Props) => {
    if (!hasCorrectData(props.settings.data)) {
        throw 'data for role settings is incorrect!';
    }

    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    useEffect(() => {
        if ('roles' in props.settings.data) {
            setSelectedRoles(props.settings.data.roles);
        }
    }, [props.settings.data]);


    const roles = [
        'something',
        'something1',
        'something2',
        'something3',
        'something4',
        'something5',
        'something6',
        'something7',
        'something8',
        'something9',
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
                    options={roles}
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
                        setSelectedRoles(value);
                        if (reason === 'clear') {
                            props.onComponentSettingChange(
                                {
                                    ...props.settings,
                                    ...{data: editRoleData(props.settings.data, [])},
                                },
                            );
                        }
                    }}
                    value={selectedRoles}
                />
            </StyledAutoComplete>
        </StyledSetting>
    );
};

const hasCorrectData = (data: object): boolean => 'roles' in data;

const editRoleData = (data: object, roles: string[]): object => {
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
