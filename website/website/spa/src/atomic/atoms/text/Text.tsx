import React from 'react';
import styled from 'styled-components';


type StyledPProps = {
    margin?: string;
}

const StyledP = styled.p<StyledPProps>`
    font-size: 20px;
    margin: ${(props: StyledPProps) => props.margin};
`;

type Props = {
    children: React.Component | string;
    margin?: string;
};

const Text: React.FC<Props> = (props: Props) => {
    return (
        <StyledP margin={props.margin}>
            {props.children}
        </StyledP>
    );
};

export default Text;
