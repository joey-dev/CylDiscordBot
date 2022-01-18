import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const CalendarRowContainer: React.FC = props => {
    return <StyledContainer>{props.children}</StyledContainer>;
};

export default CalendarRowContainer;
