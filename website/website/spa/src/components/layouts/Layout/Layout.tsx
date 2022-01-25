import React from 'react';

type Props = {
    children: any;
};

const Layout: React.FC<Props> = (props: Props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};


export default Layout;
