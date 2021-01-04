import React from 'react';
import CalendarMonthSwitcher from '../../modecules/calendar/CalendarMonthSwitcher';
import CalendarItems from '../../organisms/calendar/CalendarItems';
import CalendarMonthRow from '../../organisms/calendar/CalendarMonthRow';
import CalendarWeekDaysText from '../../organisms/calendar/CalendarWeekDaysText';
import styled from 'styled-components';
import { FormattedMonthWithDays } from '../../../interfaces/Date';

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 5%;
    margin: 5%;
`;

type Props = {
    dates: FormattedMonthWithDays[];
    keyOfSelectedMonth: number;
    dateToCalculateFrom: Date;
    clickedOnMonth: (year: number, month: number) => void;
    leftMonthArrowClick: () => void;
    rightMonthArrowClick: () => void;
};

const CalendarTemplate: React.FC<Props> = props => {
    return (
        <StyledDiv>
            <CalendarMonthRow
                totalMonths={13}
                thisYear={props.dateToCalculateFrom.getFullYear()}
                thisMonth={props.dateToCalculateFrom.getMonth()}
                itemClicked={props.clickedOnMonth}
            />
            <div>
                <CalendarMonthSwitcher
                    monthName={props.dateToCalculateFrom.toLocaleString('default', { month: 'long' })}
                    clickedLeftArrow={props.leftMonthArrowClick}
                    clickedRightArrow={props.rightMonthArrowClick}
                />
                <CalendarWeekDaysText />
                <CalendarItems
                    thisMonth={props.dateToCalculateFrom.getMonth()}
                    dates={props.dates}
                    keyOfSelectedMonth={props.keyOfSelectedMonth}
                />
            </div>
        </StyledDiv>
    );
};

export default CalendarTemplate;
