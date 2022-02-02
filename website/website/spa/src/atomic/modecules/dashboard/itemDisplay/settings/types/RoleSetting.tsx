import { QuestionMark } from '@mui/icons-material';
import { Autocomplete, IconButton, Switch, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import Text from '../../../../../atoms/text/Text';


const StyledSetting = styled.div`
`;

const StyledAutoComplete = styled.div`
`;

const StyledSwitch = styled.div`
    text-align: right;
    padding: 7px 0;
`;

type Props = {};

const RoleSetting: React.FC<Props> = (props: Props) => {
    const [enableRoles, setEnableRoles] = useState(true);
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

    return (
        <StyledSetting>
            <Text small={true}
                float="left"
            >Disable or enable some roles?</Text>
            <Tooltip title="When enabled, any role that is not in the list will not be able to use the command. When disabled any roles that are in the list will not be able to use that command.">
                <IconButton sx={{width: '20px', float: 'left'}} >
                    <QuestionMark sx={{width: '20px'}} />
                </IconButton>
            </Tooltip>
            <StyledSwitch>
                <Switch
                    name="enabled"
                    onChange={() => (setEnableRoles(!enableRoles))}
                    checked={enableRoles}
                    edge="end"
                    color="info"
                />
            </StyledSwitch>
            <Text small={true}>{enableRoles ? 'enabled' : 'disabled'} roles:</Text>
            <StyledAutoComplete>
                <Autocomplete
                    disablePortal
                    disableCloseOnSelect
                    options={roles}
                    id="combo-box-demo"
                    size="small"
                    multiple
                    sx={{width: '100%'}}
                    renderInput={(params) => <TextField color="info" {...params}
                        label="Roles"
                    />}
                />
            </StyledAutoComplete>
        </StyledSetting>
    );
};


export default (RoleSetting);
