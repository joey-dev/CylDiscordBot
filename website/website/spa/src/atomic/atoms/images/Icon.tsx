import React from 'react';
import styled from 'styled-components';
import nl from '../../../assets/icons/countryFlags/nl.svg';
import us from '../../../assets/icons/countryFlags/us.svg';
import utility from '../../../assets/icons/utility.svg';


type StyledIconProps = {
    float?: 'left' | 'right';
    margin?: string;
};

const StyledIcon = styled.img<StyledIconProps>`
    width: 25px;
    float: ${(props: StyledIconProps) => props.float};
    margin: ${(props: StyledIconProps) => props.margin};
`;

export type IIconName = 'utility' | 'us' | 'nl' | 'test';

type Props = {
    name: IIconName;
    float?: 'left' | 'right';
    margin?: string;
};

const Icon: React.FC<Props> = (props: Props) => {
    let icon;

    switch (props.name) {
        case 'utility':
            icon = utility;
            break;
        case 'nl':
            icon = nl;
            break;
        case 'us':
            icon = us;
            break;
    }

    return (
        <StyledIcon src={icon}
            float={props.float}
            margin={props.margin}
        />
    );
};


export default Icon;
