import React from 'react';
import styled from 'styled-components';

const sideToBeAligned = (aligned?: string): string => {
    switch (aligned) {
        case 'right':
            return 'right';
        case 'left':
            return 'left';
        case 'center':
            return 'center';
        default:
            return 'inherit';
    }
};

type StyledImgProps = {
    aligned?: string;
    isClickable?: boolean;
    grid?: string;
    width?: string;
};

const StylesImg = styled.img<StyledImgProps>`
    width: ${props => props.width || '100px' };
    border-radius: 20px;
    float: ${props => sideToBeAligned(props.aligned)};
    cursor: ${props => (props.isClickable ? 'pointer' : 'default')};
    grid-area: ${props => props.grid}
`;

type Props = {
    image?: string;
    aligned?: string;
    isClickable?: boolean;
    clicked?: (event: React.MouseEvent<HTMLElement>) => void;
    grid?: string;
    width?: string;
};

const ProfilePicture: React.FC<Props> = props => {
    const imageName = props.image || 'noPicture.jpeg';
    const images = require.context('../../../assets/images/profilePictures', true);
    const image = images('./' + imageName);

    return (
        <StylesImg
            src={image}
            alt="Your profile"
            isClickable={props.isClickable}
            aligned={props.aligned}
            onClick={props.clicked}
            grid={props.grid}
            width={props.width}
        />
    );
};

export default ProfilePicture;
