import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../interfaces/User';
import { MapStateToProps } from '../../store';
import FormModal from '../../components/modals/FormModal/FormModal';

type Props = {
    show: boolean;
    onClose: () => void;
    user?: User;
};

const Profile: React.FC<Props> = (props: Props) => {
    const onSubmitHandler = () => {
        console.log('form submitted');
    };

    return <FormModal onSubmit={onSubmitHandler} onCancel={props.onClose} show={props.show}></FormModal>;
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        user: state.user.user,
    };
};

export default connect(mapStateToProps)(Profile);
