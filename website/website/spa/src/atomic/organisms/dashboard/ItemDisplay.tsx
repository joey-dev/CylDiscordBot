import React  from 'react';
import styled from 'styled-components';


const StyledBackground = styled.div`
    background-color: #36393F;
    width: calc(100vw - 300px);
    position: absolute;
    left: 300px;
    height: calc(95vh - 32px);
    overflow-y: auto;
    
    ::-webkit-scrollbar {
        width: 6px;
        padding: 3px
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #43464D;
    }
`;


type Props = {};

const ItemDisplay: React.FC<Props> = (props: Props) => {

    return (
        <StyledBackground>
        </StyledBackground>
    );
};

export default (ItemDisplay);
