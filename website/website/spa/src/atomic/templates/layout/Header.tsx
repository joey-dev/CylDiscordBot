import React, { useState } from 'react';
import ProfilePicture from '../../atoms/profile/ProfilePicture';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Profile from '../../../pages/Profile/Profile';
import { MapStateToProps } from '../../../store';

const OuterDiv = styled.div`
    width: 100%;
    overflow: hidden;
`;

const StyledH1 = styled.h1`
    display: inline-block;
`;

type Props = {
    username?: string;
};

const Header: React.FC<Props> = (props: Props) => {
    const [showProfile, setShowProfile] = useState(false);

    const openProfileHandler = () => {
        setShowProfile(true);
    };

    const closeProfileHandler = () => {
        setShowProfile(false);
    };

    return (
        <React.Fragment>
            <OuterDiv>
                <StyledH1>Hello, {props.username}</StyledH1>
                <ProfilePicture aligned={'right'} clicked={openProfileHandler} isClickable />
            </OuterDiv>
            <Profile show={showProfile} onClose={closeProfileHandler} />
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        username: state.user.user?.username,
    };
};

export default connect(mapStateToProps)(Header);
