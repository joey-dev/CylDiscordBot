import React from 'react';
import styled from 'styled-components';
import utility from '../../../assets/icons/utility.svg';


type StyledIconProps = {
    float?: 'left' | 'right';
}

const StyledIcon = styled.img<StyledIconProps>`
    width: 25px;
    float: ${(props: StyledIconProps) => props.float};
`;

type IconName = 'utility' | 'test';

type Props = {
    name: IconName;
    float?: 'left' | 'right';
}

const Icon: React.FC<Props> = (props: Props) => {
    let icon;

    switch (props.name) {
        case 'utility':
            icon = utility;
            break;
    }

    return (
        <StyledIcon src={icon}
            float={props.float}
        />
    );
};


export default Icon;
