import React from 'react';
import styled from 'styled-components';

type ButtonTypes = 'submit' | 'button';

type Props = {
    type?: ButtonTypes;
    onClick?: () => void;
};

const StyledButton = styled.button`
    width: auto;
    font-size: 1.5em;
    background-color: grey;
    border: 1px solid grey;

    :hover {
        background-color: white;
        cursor: pointer;
    }
`;

const Button: React.FC<Props> = props => {
    return (
        <StyledButton type={props.type ? props.type : 'button'} onClick={props.onClick}>
            {props.children}
        </StyledButton>
    );
};

export default Button;
