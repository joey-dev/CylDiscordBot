import React, { FormEvent } from 'react';

export type TextAreaOnChange = React.ChangeEvent<HTMLTextAreaElement>;
export type InputTextOnChange = React.ChangeEvent<HTMLInputElement>;
export type AnyInputOnChange = TextAreaOnChange | InputTextOnChange;

export type FormOnSubmit = FormEvent<HTMLFormElement>;
