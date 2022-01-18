import React from 'react';
import CalendarMonthItem from '../../atoms/calendar/CalendarMonthItem';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 100%;
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
`;

type Date = {
    month: number;
    year: number;
};

type Props = {
    totalMonths: number;
    thisYear: number;
    thisMonth: number;
    itemClicked: (year: number, month: number) => void;
};

const CalendarMonthRow: React.FC<Props> = props => {
    const totalMonthsOnOneSideOfThisMonth = Math.floor((props.totalMonths - 1) / 2);

    let monthsAndYearAbove = [];
    for (let monthKey = 1; monthKey <= totalMonthsOnOneSideOfThisMonth; monthKey++) {
        let yearToUse = props.thisYear;
        let monthToUse = props.thisMonth + monthKey;

        if (monthToUse > 11) {
            yearToUse++;
            monthToUse = monthToUse - 11;
        }

        const thisDate = new Date(yearToUse, monthToUse);
        monthsAndYearAbove.push({
            month: thisDate.getMonth(),
            year: thisDate.getFullYear(),
        });
    }

    let monthsAndYearBelowThisYear: Date[] = [];
    let monthsAndYearBelowNextYear: Date[] = [];

    for (let monthKey = 1; monthKey <= totalMonthsOnOneSideOfThisMonth; monthKey++) {
        let yearToUse = props.thisYear;
        let monthToUse = props.thisMonth - monthKey;

        if (monthToUse < 0) {
            yearToUse--;
            monthToUse = monthToUse + 12;

            const thisDate = new Date(yearToUse, monthToUse);
            monthsAndYearBelowNextYear = [
                {
                    month: thisDate.getMonth(),
                    year: thisDate.getFullYear(),
                },
                ...monthsAndYearBelowNextYear,
            ];
        } else {
            const thisDate = new Date(yearToUse, monthToUse);
            monthsAndYearBelowThisYear = [
                {
                    month: thisDate.getMonth(),
                    year: thisDate.getFullYear(),
                },
                ...monthsAndYearBelowThisYear,
            ];
        }
    }

    const monthsAndYearBelow = [...monthsAndYearBelowNextYear, ...monthsAndYearBelowThisYear];

    const calendarMonthsAbove = monthsAndYearAbove.map((monthAndYear, key) => (
        <CalendarMonthItem
            key={+(monthAndYear.month.toString() + monthAndYear.year.toString())}
            month={monthAndYear.month}
            year={monthAndYear.year}
            thisMonth={false}
            alternativeColor={key % 2 === 1}
            clicked={props.itemClicked}
        />
    ));

    const calendarMonthsBelow = monthsAndYearBelow.map((monthAndYear, key) => (
        <CalendarMonthItem
            key={+(monthAndYear.month.toString() + monthAndYear.year.toString())}
            month={monthAndYear.month}
            year={monthAndYear.year}
            thisMonth={false}
            alternativeColor={key % 2 === 0}
            clicked={props.itemClicked}
        />
    ));

    return (
        <StyledDiv>
            {calendarMonthsBelow}
            <CalendarMonthItem
                key={+(props.thisMonth.toString() + props.thisYear.toString())}
                month={props.thisMonth}
                year={props.thisYear}
                thisMonth={true}
                clicked={() => {}}
            />
            {calendarMonthsAbove}
        </StyledDiv>
    );
};

export default CalendarMonthRow;
