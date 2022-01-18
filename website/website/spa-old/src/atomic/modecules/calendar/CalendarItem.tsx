import React from 'react';
import styled from 'styled-components';
import CalendarDateItem from '../../atoms/calendar/CalendarDateItem';
import CalendarDayNumber from '../../atoms/calendar/CalendarDayNumber';
import { Item } from '../../../interfaces/Date';

const StyledDiv = styled.div`
    border: 1px solid black;
`;

type Props = {
    items?: Item[];
    thisMonth?: boolean;
    day: number;
};

const CalendarItem: React.FC<Props> = props => {
    let allDateItems;
    if (props.items && props.items.length > 0) {
        allDateItems = props.items.map((dateItem, index) => (
            <CalendarDateItem key={index} time={dateItem.time} colouredBackground={index % 2 === 0}>
                {dateItem.title}
            </CalendarDateItem>
        ));
    }

    return (
        <StyledDiv>
            <CalendarDayNumber thisMonth={props.thisMonth}>{props.day}</CalendarDayNumber>
            {allDateItems}
        </StyledDiv>
    );
};

export default CalendarItem;
