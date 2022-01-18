import React from 'react';
import CalendarRowContainer from '../../atoms/calendar/CalendarRowContainer';
import CalendarWeekDayTextBox from '../../modecules/calendar/CalendarWeekDayTextBox';

const CalendarWeekDaysText: React.FC = () => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <CalendarRowContainer>
            {weekDays.map((weekDay, key) => (
                <CalendarWeekDayTextBox key={key}>{weekDay}</CalendarWeekDayTextBox>
            ))}
        </CalendarRowContainer>
    );
};

export default CalendarWeekDaysText;
