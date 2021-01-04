import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Backdrop from '../../../atomic/atoms/Backdrop/Backdrop';
import { MODAL_TIER1 } from '../../../config/ZIndex/ZIndex';
import CloseButton from '../../../atomic/atoms/buttons/CloseButton/CloseButton';
import FullInput from '../../../atomic/modecules/input/FullInput';
import { FormOnSubmit, InputTextOnChange, TextAreaOnChange } from '../../../interfaces/formTypes/FormEvents';
import ProfilePicture from '../../../atomic/atoms/profile/ProfilePicture';
import { MapStateToProps } from '../../../store';
import { connect } from 'react-redux';
import { OptionalUser, User } from '../../../interfaces/User';
import Button from '../../../atomic/atoms/buttons/Button/Button';
import ValidateInput from '../../../services/profile/ValidateInput';
import { updateUserStart } from '../../../store/user/Action';
import Loader from '../../../atomic/atoms/Loader/Loader';

type ModalProps = {
    show: boolean;
};

const Modal = styled.div<ModalProps>`
    position: fixed;
    display: ${props => (props.show ? 'block' : 'none')};
    width: 60vw;
    height: 60vh;
    top: 20vh;
    left: 20vw;
    background-color: #eeeeee;
    z-index: ${MODAL_TIER1};
    border-radius: 5%;
`;

const Content = styled.form`
    display: grid;
    grid-template: "username profilePicture" "firstName profilePicture" "lastName profilePicture" "email profilePicture" "password repeatPassword";
    grid-gap: 30px;
    padding: 20px;
`;

type formFieldValues = string;

type Props = {
    onSubmit: () => void;
    onCancel: () => void;
    show: boolean;
    user?: User;
    updateUserStart: (user: OptionalUser) => void;
    loading: boolean
    success: boolean
    error?: string
};

const FormModal: React.FC<Props> = props => {
    const [userId, setUserId] = useState<formFieldValues>('');
    const [username, setUsername] = useState<formFieldValues>('');
    const [firstName, setFirstName] = useState<formFieldValues>('');
    const [lastName, setLastName] = useState<formFieldValues>('');
    const [email, setEmail] = useState<formFieldValues>('');
    const [password, setPassword] = useState<formFieldValues>('');
    const [repeatPassword, setRepeatPassword] = useState<formFieldValues>('');
    const [errors, setErrors] = useState<string[]>([]);

    const {user, error} = props;

    useEffect(() => {
        setUserId(user?.userId.toString() || '');
        setUsername(user?.username || '');
        setFirstName(user?.firstName || '');
        setLastName(user?.lastName || '');
        setEmail(user?.email || '');
    }, [user]);

    useEffect(() => {
        if (error) {
            setErrors([error || '']);
        }
    }, [error]);

    const onChangeInputValuesHandler = (name: string, event: InputTextOnChange | TextAreaOnChange) => {
        const value = event.target.value;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'repeatPassword':
                setRepeatPassword(value);
                break;
            default:
                throw 'The input ' + name + ' is not implemented jet!';
        }
    }

    const onSaveHandler = (event: FormOnSubmit) => {
        event.preventDefault();
        let errorMessages = ValidateInput({
            username,
            firstName,
            lastName,
            email,
            password,
            repeatPassword,
        });

        if (errorMessages.length > 0) {
            setErrors(errorMessages);
            return;
        }
        setErrors([]);

        let newUserData: OptionalUser = {};

        newUserData.userId = +userId;
        if (username) {
            newUserData.username = username;
        }
        if (email) {
            newUserData.email = email;
        }
        if (firstName) {
            newUserData.firstName = firstName;
        }
        if (lastName) {
            newUserData.lastName = lastName;
        }

        console.log(newUserData);

        props.updateUserStart(newUserData);
    };

    return (
        <React.Fragment>
            <Backdrop show={props.show}
                onClose={props.onCancel}
            />

            <Modal show={props.show}>
                <CloseButton clicked={props.onCancel} />
                <Content onSubmit={onSaveHandler}>
                    <FullInput name="Username"
                        type="text"
                        grid="username"
                        inputChanged={event => onChangeInputValuesHandler('username', event)}
                        value={username}
                    />
                    <FullInput name="FirstName"
                        type="text"
                        grid="firstName"
                        inputChanged={event => onChangeInputValuesHandler('firstName', event)}
                        value={firstName}
                    />
                    <FullInput name="LastName"
                        type="text"
                        grid="lastName"
                        inputChanged={event => onChangeInputValuesHandler('lastName', event)}
                        value={lastName}
                    />
                    <FullInput name="Email"
                        type="email"
                        grid="email"
                        inputChanged={event => onChangeInputValuesHandler('email', event)}
                        value={email}
                    />
                    <FullInput name="Password"
                        type="password"
                        grid="password"
                        inputChanged={event => onChangeInputValuesHandler('password', event)}
                        value={password}
                        placeholder="****"
                    />
                    <FullInput name="RepeatPassword"
                        type="password"
                        grid="repeatPassword"
                        inputChanged={event => onChangeInputValuesHandler('repeatPassword', event)}
                        value={repeatPassword}
                        placeholder="****"
                    />
                    <ProfilePicture grid="profilePicture"
                        width="60%"
                    />
                    <Button type="submit">Save {props.loading ? (<Loader small />) : null}</Button>
                    <ul>
                        {
                            errors ? errors.map(error => (
                                <li key={error.replace(' ', '')}>{error}</li>
                            )) : null
                        }
                        {
                            props.success ? (
                                <p>Your profile has been successfully saved</p>
                            ) : null
                        }
                    </ul>
                </Content>
            </Modal>
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        user: state.user.user,
        success: state.user.success,
        loading: state.user.loading,
        error: state.user.error,
    };
};

type DispatchPropsArgs = {
    type: String
    payload: DispatchPropsPayload
}

type DispatchPropsPayload = {
    user: OptionalUser
}

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        updateUserStart: (user: OptionalUser) => dispatch(updateUserStart(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
