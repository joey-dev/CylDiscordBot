import React from 'react';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/input/Label';
import { InputTextOnChange, TextAreaOnChange } from '../../../interfaces/formTypes/FormEvents';
import { FormType } from '../../../interfaces/formTypes/FormType';
import styled from 'styled-components';

type StyledDivProps = {
    grid?: string;
}

const StyledDiv = styled.div<StyledDivProps>`
    grid-area: ${props => props.grid}
`;

type Props = {
    name: string;
    type: FormType;
    grid?: string;
    inputChanged: (event: InputTextOnChange | TextAreaOnChange) => void;
    value: string;
    placeholder?: string
};

const FullInput: React.FC<Props> = props => {
    return (
        <StyledDiv grid={props.grid}>
            <Label for={props.name}>{props.name}</Label>
            <Input id={props.name} inputType={props.type} name={props.name} changed={props.inputChanged} value={props.value} placeholder={props.placeholder} />
        </StyledDiv>
    );
};

export default FullInput;
