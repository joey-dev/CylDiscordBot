import React from 'react';
import ArrowLeft from '../../atoms/arrows/ArrowLeft';
import ArrowRight from '../../atoms/arrows/ArrowRight';
import styled from 'styled-components';

const StyledDiv = styled.div`
    text-align: center;
    margin-bottom: 10px;
`;

type Props = {
    clickedLeftArrow: () => void;
    clickedRightArrow: () => void;
    monthName: string;
};

const CalendarMonthSwitcher: React.FC<Props> = props => {
    return (
        <StyledDiv>
            <ArrowLeft onClick={props.clickedLeftArrow} spacing={true} />
            {props.monthName}
            <ArrowRight onClick={props.clickedRightArrow} spacing={true} />
        </StyledDiv>
    );
};

export default CalendarMonthSwitcher;
