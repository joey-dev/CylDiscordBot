import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

type StyledDivProps = {
    colouredBackground: boolean;
};

const StyledDiv = styled.div<StyledDivProps>`
    width: calc(100% - 10px);
    text-align: center;
    padding: 5px;
    background-color: ${props => (props.colouredBackground ? 'grey' : 'white')};
`;

type Props = {
    time: Time;
    children: PropsWithChildren<any>;
    colouredBackground: boolean;
};

type Time = {
    hours: number;
    minutes: number;
};

const CalendarDateItem: React.FC<Props> = props => {
    let title = props.children;
    if (props.children.length > 15) {
        title = props.children.substring(0, 15);
        title += '...';
    }

    const hour = props.time.hours < 10 ? '0' + props.time.hours : props.time.hours;
    const minute = props.time.minutes < 10 ? '0' + props.time.minutes : props.time.minutes;
    const time = hour + ':' + minute;

    return (
        <StyledDiv colouredBackground={props.colouredBackground}>
            {time} - {title}
        </StyledDiv>
    );
};

export default CalendarDateItem;
