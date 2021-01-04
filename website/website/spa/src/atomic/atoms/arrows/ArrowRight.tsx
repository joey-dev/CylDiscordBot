import React from 'react';
import styled from 'styled-components';

type Props = {
    spacing: boolean;
    onClick: () => void;
};

type StyledSpanProps = {
    needSpacing: boolean;
};

const StyledSpan = styled.span<StyledSpanProps>`
    margin: ${props => (props.needSpacing ? '0 10px 0 10px' : '0')};

    &:hover {
        cursor: pointer;
    }
`;

const ArrowRight: React.FC<Props> = props => {
    return (
        <StyledSpan needSpacing={props.spacing} onClick={props.onClick}>
            &#62;
        </StyledSpan>
    );
};

export default ArrowRight;
