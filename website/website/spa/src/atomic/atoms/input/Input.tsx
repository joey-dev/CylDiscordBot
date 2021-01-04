import React, { Fragment } from 'react';
import styled from 'styled-components';
import { InputTextOnChange, TextAreaOnChange } from '../../../interfaces/formTypes/FormEvents';
import { FormType } from '../../../interfaces/formTypes/FormType';

type StyledInputProps = {
    type: FormType;
    name: string;
    id: string;
    onChange: (event: InputTextOnChange) => void;
};

const StyledInput = styled.input<StyledInputProps>`
    width: 100%;
`;

type StyledTextareaProps = {
    name: string;
    id: string;
    onChange: (event: TextAreaOnChange) => void;
};

const StyledTextarea = styled.textarea<StyledTextareaProps>`
    width: 99%;
`;

type itemsToAddToInputProps = {
    name: string;
    id: string;
    onChange: (event: InputTextOnChange | TextAreaOnChange) => void;
};

type Props = {
    inputType: FormType;
    name: string;
    id: string;
    changed: (event: InputTextOnChange | TextAreaOnChange) => void;
    value: string;
    placeholder?: string;
};

const Input: React.FC<Props> = props => {
    let inputType;

    switch (props.inputType) {
        case 'text':
        case 'email':
        case 'password':
            inputType = 'input';
            break;
        case 'textarea':
            inputType = 'textarea';
            break;
        default:
            inputType = 'input';
    }

    const itemsToAddToInput: itemsToAddToInputProps = {
        name: props.name,
        id: props.name,
        onChange: props.changed,
    };

    const input =
        inputType === 'input' ? (
            <StyledInput type={props.inputType} {...itemsToAddToInput} value={props.value} placeholder={props.placeholder || ''} />
        ) : (
            <StyledTextarea {...itemsToAddToInput} placeholder={props.placeholder || ''} >{props.value}</StyledTextarea>
        );

    return <Fragment>{input}</Fragment>;
};

export default Input;
