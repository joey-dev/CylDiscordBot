import React from 'react';
import styled from 'styled-components';


type StyledPProps = {
    small: boolean;
}

const StyledP = styled.p<StyledPProps>`
    color: ${(props: StyledPProps) => (props.small ? 'grey' : 'white')};
    text-align: left;
    font-size: ${(props: StyledPProps) => (props.small ? '15px' : '25px')};
`;

type Props = {
    small: boolean
    children: React.Component | string;
};

const Title: React.FC<Props> = (props: Props) => {
    return (
        <StyledP small={props.small}>
            {props.children}
        </StyledP>
    );
};

export default Title;
