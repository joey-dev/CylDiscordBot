import React from 'react';
import styled from 'styled-components';

const OuterDiv = styled.div`
    width: 100%;
    overflow: hidden;
`;

const StyledH1 = styled.h1`
    display: inline-block;
`;


const Header: React.FC = () => {
    return (
        <React.Fragment>
            <OuterDiv>
                <StyledH1>Hello, user</StyledH1>
            </OuterDiv>
        </React.Fragment>
    );
};


export default Header;
