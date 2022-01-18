import React from 'react';
import styled from 'styled-components';
import { BACKDROP } from '../../../config/ZIndex/ZIndex';

type StyledDivProps = {
    show: boolean;
};

const StyledDiv = styled.div<StyledDivProps>`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: ${props => (props.show ? 'block' : 'none')};
    z-index: ${BACKDROP};
    background-color: #c4c4c4;
    opacity: 0.7;
`;

type Props = {
    show: boolean;
    onClose: () => void;
};

const Backdrop: React.FC<Props> = props => {
    return <StyledDiv show={props.show} onClick={props.onClose} />;
};

export default Backdrop;
