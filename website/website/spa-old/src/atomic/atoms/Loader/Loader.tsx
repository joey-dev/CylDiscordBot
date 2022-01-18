import React from 'react';
import styled, { keyframes } from 'styled-components';

const ldsDualRingKeyframe = keyframes`
    0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
`;

type StyledDivProps = {
    centered?: boolean;
};

const StyledSpan = styled.span<StyledDivProps>`
    position: ${props => (props.centered ? 'absolute' : 'unset')};
    left: calc(50% - 32px);
    top: 30%;
`;

type StyledLoaderProps = {
    small?: boolean;
};

const smallLoader = {
    width: '15px',
    height: '15px',
    borderThickness: '3px',
};

const largeLoader = {
    width: '64px',
    height: '64px',
    borderThickness: '6px',
};

const StyledLoader = styled.span<StyledLoaderProps>`
    display: inline-block;
    &:after {
        content: ' ';
        display: block;
        width: ${props => (props.small ? smallLoader.width : largeLoader.width)};
        height: ${props => (props.small ? smallLoader.height : largeLoader.height)};
        border-radius: 50%;
        border: ${props => (props.small ? smallLoader.borderThickness : largeLoader.borderThickness)} solid black;
        border-color: black transparent black transparent;
        animation: ${ldsDualRingKeyframe} 1.2s linear infinite;
    }
`;

type Props = {
    centered?: boolean;
    small?: boolean;
};

const Loader: React.FC<Props> = props => {
    return (
        <StyledSpan centered={props.centered}>
            <StyledLoader small={props.small} />
        </StyledSpan>
    );
};

export default Loader;
