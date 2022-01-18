import React, { useCallback, useEffect, useState } from 'react';
import Loader from '../../atomic/atoms/Loader/Loader';
import CalendarTemplate from '../../atomic/templates/calendar/CalendarTemplate';
import { FormattedDate, FormattedMonthWithWeeks, FormattedWeek } from '../../interfaces/Date';

const Calendar: React.FC = () => {
    const [dates, setDates] = useState<FormattedMonthWithWeeks>([]);
    const [keyOfSelectedMonth, setKeyOfSelectedMonth] = useState(0);
    const [dateToCalculateFrom, setDateToCalculateFrom] = useState(new Date());

    const addNewDateToArray = useCallback((dateToLoad: Date): FormattedWeek => {
        const month = dateToLoad.getMonth();
        const year = dateToLoad.getFullYear();
        const totalDaysInMonth = getTotalDaysInMonth(year, month);
        const allDatesOfThisMonth: FormattedDate[] = [];
        const items = [
            { title: 'going to work', time: { hours: 8, minutes: 30 } },
            { title: 'going back home', time: { hours: 5, minutes: 0 } },
        ];

        for (let day = 1; day < totalDaysInMonth + 1; day++) {
            const dateToLoadForThisDay = new Date(year, month, day);
            const weekDay = dateToLoadForThisDay.toLocaleString('default', { weekday: 'long' });

            allDatesOfThisMonth.push({
                year,
                month,
                day,
                weekDay,
                items,
            });
        }

        return allDatesOfThisMonth;
    }, []);

    const initCalendar = useCallback((): void => {
        const dateNow = dateToCalculateFrom;
        const dateLastMonth = getDateOfLastMonth(dateNow);
        const dateNextMonth = getDateOfNextMonth(dateNow);

        const monthsToLoad = [dateLastMonth, dateNow, dateNextMonth];

        let allNewDates: FormattedMonthWithWeeks = [];
        monthsToLoad.forEach(dateToLoad => {
            allNewDates.push(addNewDateToArray(dateToLoad));
        });

        setDates(allNewDates);
        setKeyOfSelectedMonth(1);
    }, [dateToCalculateFrom, addNewDateToArray]);

    useEffect(() => {
        initCalendar();
    }, [initCalendar]);

    const getDateOfLastMonth = (dateNow: Date): Date => {
        if (dateNow.getMonth() === 0) {
            return new Date(dateNow.getFullYear() - 1, 11, 1);
        } else {
            return new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, 1);
        }
    };

    const getDateOfNextMonth = (dateNow: Date): Date => {
        if (dateNow.getMonth() === 11) {
            return new Date(dateNow.getFullYear() + 1, 0, 1);
        } else {
            return new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 1);
        }
    };

    const getTotalDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const clickedOnMonthHandler = (year: number, month: number): void => {
        changeMonth(year, month);
    };

    const onRightMonthArrowClickHandler = (): void => {
        let year = dateToCalculateFrom.getFullYear();
        let nextMonth = dateToCalculateFrom.getMonth() + 1;
        if (nextMonth === 12) {
            nextMonth = 0;
            year += 1;
        }

        changeMonth(year, nextMonth);
    };

    const onLeftMonthArrowClickHandler = (): void => {
        let year = dateToCalculateFrom.getFullYear();
        let nextMonth = dateToCalculateFrom.getMonth() - 1;
        if (nextMonth < 0) {
            nextMonth = 11;
            year -= 1;
        }

        changeMonth(year, nextMonth);
    };

    const changeMonth = (year: number, month: number): void => {
        const newDateToCalculateFrom = new Date(year, month + 1, 0);

        setDateToCalculateFrom(newDateToCalculateFrom);
    };

    let calendarTemplate = <Loader />;
    if (dates && keyOfSelectedMonth) {
        calendarTemplate = (
            <CalendarTemplate
                dates={dates}
                keyOfSelectedMonth={keyOfSelectedMonth}
                dateToCalculateFrom={dateToCalculateFrom}
                clickedOnMonth={clickedOnMonthHandler}
                rightMonthArrowClick={onRightMonthArrowClickHandler}
                leftMonthArrowClick={onLeftMonthArrowClickHandler}
            />
        );
    }

    return <div>{calendarTemplate}</div>;
};

export default Calendar;
