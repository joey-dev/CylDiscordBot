import React from 'react';
import styled from 'styled-components';


type StyledPProps = {
    margin?: string;
    onClick?: () => void;
}

const StyledP = styled.p<StyledPProps>`
    font-size: 20px;
    margin: ${(props: StyledPProps) => props.margin};

    &:hover {
        cursor:  ${(props: StyledPProps) => props.onClick ? 'pointer' : 'auto'};
    }
`;

type Props = {
    children: React.Component | string;
    onClick?: () => void;
    margin?: string;
};

const Text: React.FC<Props> = (props: Props) => {
    return (
        <StyledP margin={props.margin} onClick={props.onClick}>
            {props.children}
        </StyledP>
    );
};

export default Text;
