import React from 'react';
import styled from 'styled-components';


type StyledPProps = {
    margin?: string;
    padding?: string;
    onClick?: () => void;
    color?: string;
    small?: boolean;
    large?: boolean;
}

const StyledP = styled.p<StyledPProps>`
    font-size: ${(props: StyledPProps) => props.small ? '15px' : (props.large ? '25px' : '20px')};
    margin: ${(props: StyledPProps) => props.margin};
    padding: ${(props: StyledPProps) => props.padding};
    color: ${(props: StyledPProps) => props.color || 'unset'};

    &:hover {
        cursor: ${(props: StyledPProps) => props.onClick ? 'pointer' : 'auto'};
    }
`;

type Props = {
    children: React.Component | string;
    onClick?: () => void;
    margin?: string;
    padding?: string;
    color?: string;
    small?: boolean;
    large?: boolean;
};

const Text: React.FC<Props> = (props: Props) => {
    return (
        <StyledP margin={props.margin}
            onClick={props.onClick}
            color={props.color}
            small={props.small}
            large={props.large}
            padding={props.padding}
        >
            {props.children}
        </StyledP>
    );
};

export default Text;
