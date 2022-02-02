import React from 'react';
import styled from 'styled-components';
import RoleSetting from './types/RoleSetting';


const StyledSetting = styled.div`
`;

export interface IComponentSetting {
    name: 'role';
}

type Props = {
    data: IComponentSetting;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {
    let returnElement;

    switch (props.data.name) {
        case 'role':
            returnElement = <RoleSetting/>
    }

    return (
        returnElement
    );
};


export default (ComponentSettings);
