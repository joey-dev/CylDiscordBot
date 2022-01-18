import React from 'react';
import Header from '../../../atomic/templates/layout/Header';
import { connect } from 'react-redux';
import { MapStateToProps } from '../../../store';

type Props = {
    isAuthenticated: boolean;
};

const Layout: React.FC<Props> = props => {
    return (
        <div>
            {props.isAuthenticated ? <Header /> : null}
            {props.children}
        </div>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return {
        isAuthenticated: state.auth.userId !== null,
    };
};

export default connect(mapStateToProps)(Layout);
