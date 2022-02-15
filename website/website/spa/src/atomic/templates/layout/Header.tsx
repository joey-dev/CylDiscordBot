import { getItemTranslate, ILanguages } from '@cylbot/cyldiscordbotlanguage/index';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MapStateToProps } from '../../../store';
import { AuthStoreState } from '../../../store/auth';
import { logout } from '../../../store/auth/Action';
import { IDisplayLanguage, websiteStoreState } from '../../../store/website';
import { setWebsiteLanguage } from '../../../store/website/Action';
import Button from '../../atoms/buttons/Button/Button';
import Icon from '../../atoms/images/Icon';

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
    setWebsiteLanguage: (language: IDisplayLanguage) => void;
};

type Props = DispatchProps & AuthStoreState & websiteStoreState;

const Header: React.FC<Props> = (props: Props) => {
    const languages: IDisplayLanguage[] = [
        {
            flag: 'us',
            name: 'en-US',
            key: 'enUS',
        },
        {
            flag: 'nl',
            name: 'nl-NL',
            key: 'nlNL',
        },
    ];

    const loginButton = (
        <Button type="button"
            onClick={() => {
                window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=794964425819160587&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&response_type=code&scope=identify%20guilds';
            }}
        >
            {getItemTranslate(props.language.key, 'LOGIN_BUTTON')}
        </Button>
    );

    const welcomeMessage = (
        <React.Fragment>
            {/*<StyledH1>Hello, {props.user?.username}</StyledH1>*/}
            <Button type="button"
                onClick={() => {
                    props.logout();
                }}
            >
                {getItemTranslate(props.language.key, 'LOGOUT')}
            </Button>
        </React.Fragment>
    );

    const handleChange = (event: SelectChangeEvent) => {
        const newLanguageKey = event.target.value as keyof ILanguages;
        const newLanguage: IDisplayLanguage | undefined = languages.find(language => language.key === newLanguageKey);

        if (newLanguage) {
            props.setWebsiteLanguage(newLanguage);
        }
    };

    return (
        <React.Fragment>
            <OuterDiv>
                {!props.isAuthenticated && loginButton}
                <ButtonDiv>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={props.language.key}
                        onChange={handleChange}
                        label="Age"
                    >
                        {languages.map(language => (
                            <MenuItem key={language.key}
                                value={language.key}
                            >
                                <Icon name={language.flag}
                                    float="left"
                                />
                                {language.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {props.isAuthenticated && welcomeMessage}
                </ButtonDiv>
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
        language: state.website.language,
    };
};

type DispatchPropsArgs = {
    type: string;
};

const mapDispatchToProps = (dispatch: (arg0: DispatchPropsArgs) => void) => {
    return {
        logout: () => dispatch(logout()),
        setWebsiteLanguage: (language: IDisplayLanguage) => dispatch(setWebsiteLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
