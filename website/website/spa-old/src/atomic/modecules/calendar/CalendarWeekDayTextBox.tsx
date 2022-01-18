import React from 'react';
import styled from 'styled-components';
import CalendarWeekDayText from '../../atoms/calendar/CalendarWeekDayText';

const StyledDiv = styled.div`
    border: 1px solid black;
`;

const CalendarWeekDayTextBox: React.FC = props => {
    return (
        <StyledDiv>
            <CalendarWeekDayText>{props.children}</CalendarWeekDayText>
        </StyledDiv>
    );
};

export default CalendarWeekDayTextBox;
