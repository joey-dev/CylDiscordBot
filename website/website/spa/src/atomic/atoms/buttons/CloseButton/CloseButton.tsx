import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 27px;
    text-align: center;
    font-size: 1.5em;
    cursor: pointer
`;

type Props = {
    clicked: () => void;
};

const CloseButton: React.FC<Props> = props => {
    return <StyledDiv onClick={props.clicked}>&times;</StyledDiv>;
};

export default CloseButton;
