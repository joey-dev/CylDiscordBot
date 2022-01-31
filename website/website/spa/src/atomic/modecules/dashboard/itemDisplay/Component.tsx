import React from 'react';
import styled from 'styled-components';
import { IFullComponent } from '../../../../interfaces/api/Component';


const StyledBackground = styled.div`

`;

type Props = {
    component: IFullComponent;
};

const Component: React.FC<Props> = (props: Props) => {
    return (
        <React.Fragment>
            <p>{props.component.name}</p>
        </React.Fragment>
    );
};

export default (Component);
