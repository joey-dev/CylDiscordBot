export type FormattedMonthWithWeeks = FormattedWeek[];
export type FormattedMonthWithDays = FormattedDate[];
export type FormattedWeek = FormattedDate[];

export interface FormattedDate {
    year: number;
    month: number;
    day: number;
    weekDay: string;
    items?: Item[];
}

export interface Item {
    time: Time;
    title: string;
}

type Time = {
    hours: number;
    minutes: number;
};
