import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/buttons/Button/Button';
import { MapStateToProps } from '../../../store';
import { connect } from 'react-redux';
import { AuthStoreState } from '../../../store/auth';
import { logout } from '../../../store/auth/Action';

const OuterDiv = styled.div`
    width: 100%;
    overflow: hidden;
    background-color: #202225;
    padding-top: 2.5vh;
    padding-bottom: 2.5vh;
`;

const StyledH1 = styled.h1`
    display: inline-block;
`;

const ButtonDiv = styled.div`
    float: right;
    margin-right: 20px;
`;

type DispatchProps = {
    logout: () => void;
};

type Props = DispatchProps & AuthStoreState;

const Header: React.FC<Props> = (props: Props) => {
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
        <React.Fragment>
            {/*<StyledH1>Hello, {props.user?.username}</StyledH1>*/}
            <ButtonDiv>
                <Button type="button"
                    onClick={() => {
                        props.logout();
                    }}
                >
                    Logout
                </Button>
            </ButtonDiv>
        </React.Fragment>
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
        user: state.user.user,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

type DispatchPropsArgs = {
    type: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
