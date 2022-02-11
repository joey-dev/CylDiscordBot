import React from 'react';
import styled from 'styled-components';


type StyledPProps = {
    margin?: string;
    padding?: string;
    onClick?: () => void;
    color?: string;
    small?: boolean;
    large?: boolean;
    border_direction?: '-bottom' | '-top' | '-left' | '-right';
    border?: string;
    float?: string;
}

const StyledP = styled.p<StyledPProps>`
    font-size: ${(props: StyledPProps) => props.small ? '15px' : (props.large ? '25px' : '20px')};
    margin: ${(props: StyledPProps) => props.margin};
    padding: ${(props: StyledPProps) => props.padding};
    color: ${(props: StyledPProps) => props.color || 'unset'};
    border${(props: StyledPProps) => props.border_direction || ''}: ${(props: StyledPProps) => props.border || ''};
    float: ${(props: StyledPProps) => props.float || 'unset'};

    &:hover {
        cursor: ${(props: StyledPProps) => props.onClick ? 'pointer' : 'auto'};
    }
`;

type Props = {
    children?: React.ReactNode;
    onClick?: () => void;
    margin?: string;
    padding?: string;
    color?: string;
    small?: boolean;
    large?: boolean;
    border_direction?: '-bottom' | '-top' | '-left' | '-right';
    border?: string;
    float?: string;
};

const Text: React.FC<Props> = (props: Props) => {
    return (
        <StyledP margin={props.margin}
            onClick={props.onClick}
            color={props.color}
            small={props.small}
            large={props.large}
            padding={props.padding}
            border_direction={props.border_direction}
            border={props.border}
            float={props.float}
        >
            {props.children}
        </StyledP>
    );
};

export default Text;
