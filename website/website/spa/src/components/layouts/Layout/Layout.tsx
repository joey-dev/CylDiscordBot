import React from 'react';

type Props = {
    isAuthenticated: boolean;
};

const Layout: React.FC<Props> = props => {
    return (
        <div>
            {props.children}
        </div>
    );
};


export default Layout;
