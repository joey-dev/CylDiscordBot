import React from 'react';
import styled from 'styled-components';

type BackGroundColorOfStyledPProps = {
    thisMonth: boolean;
    alternativeColor?: boolean;
};

type backGroundColors = 'darkGrey' | 'grey' | 'white';

const backGroundColorOfStyledP = (props: BackGroundColorOfStyledPProps): backGroundColors => {
    if (props.thisMonth) {
        return 'darkGrey';
    } else if (props.alternativeColor) {
        return 'grey';
    }
    return 'white';
};

type StyledPProps = {
    thisMonth: boolean;
    alternativeColor?: boolean;
};

const StyledP = styled.p<StyledPProps>`
    padding: calc(100% / 13);
    margin: 0;
    text-align: center;
    background-color: ${props => backGroundColorOfStyledP(props)};

    &:hover {
        background-color: #717171;
        cursor: pointer;
    }
`;

type Props = {
    thisMonth: boolean;
    alternativeColor?: boolean;
    year: number;
    month: number;
    clicked: (year: number, month: number) => void;
};

const CalendarMonthItem: React.FC<Props> = props => {
    const monthInName: string = new Date(props.year, props.month + 1, 0).toLocaleString('default', { month: 'long' });

    return (
        <StyledP
            thisMonth={props.thisMonth}
            alternativeColor={props.alternativeColor}
            onClick={() => props.clicked(props.year, props.month)}
        >
            {monthInName} - {props.year}
        </StyledP>
    );
};

export default CalendarMonthItem;
