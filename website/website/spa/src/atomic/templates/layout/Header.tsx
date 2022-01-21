import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/buttons/Button/Button';
import { MapStateToProps } from '../../../store';
import { connect } from 'react-redux';
import { AuthStoreState } from '../../../store/auth/Index';

const OuterDiv = styled.div`
    width: 100%;
    overflow: hidden;
`;

const StyledH1 = styled.h1`
    display: inline-block;
`;


const Header: React.FC<AuthStoreState> = (props: AuthStoreState) => {
    const loginButton = (
        <Button type="button"
            onClick={() => {
                window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=794964425819160587&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds';
            }}
        >
            Login with Discord
        </Button>
    );

    const welcomeMessage = (
        <StyledH1>Hello, {props.user?.username}</StyledH1>
    );

    return (
        <React.Fragment>
            <OuterDiv>
                {!props.isAuthenticated && loginButton}
                {props.isAuthenticated && welcomeMessage}
            </OuterDiv>
        </React.Fragment>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

export default connect(mapStateToProps)(Header);
