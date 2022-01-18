import React from 'react';
import styled from 'styled-components';

type StyledDayNumberProps = {
    thisMonth?: boolean;
};

const StyledDayNumber = styled.p<StyledDayNumberProps>`
    margin-top: 5px;
    text-align: center;
    color: ${props => (props.thisMonth ? 'black' : 'grey')};
`;

type Props = {
    thisMonth?: boolean;
    children: number;
};

const CalendarDayNumber: React.FC<Props> = props => {
    return <StyledDayNumber thisMonth={props.thisMonth}>{props.children}</StyledDayNumber>;
};

export default CalendarDayNumber;
