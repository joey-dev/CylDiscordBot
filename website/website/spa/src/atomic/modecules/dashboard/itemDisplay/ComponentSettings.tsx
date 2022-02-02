import { Modal } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { IFullComponentWithData } from '../../../../interfaces/api/Component';
import Text from '../../../atoms/text/Text';
import ComponentSetting, { IComponentSetting } from './settings/ComponentSetting';


const StyledModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #36393f;
    color: white;
    border: 2px solid #000;
    box-shadow: black;
    max-height: 80%;
    width: 40%;
    padding: 40px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 6px;
        padding: 3px
    }

    ::-webkit-scrollbar-thumb {
        background-color: #43464D;
    }
`;

const StyledSettings = styled.div`
`;


type Props = {
    open: boolean;
    onClose: () => void;
    component: IFullComponentWithData;
};

const ComponentSettings: React.FC<Props> = (props: Props) => {

    // let serverData = JSON.parse(props.component.server_data);
    let serverData: IComponentSetting[] = [
        {
            name: 'role',
        },
    ];

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledModal>
                <Text margin={'0'}
                    padding={'0px 0px 30px 0px'}
                    border_direction="-bottom"
                    border="1px solid darkgrey"
                >
                    Edit {props.component.name} settings
                </Text>
                <StyledSettings>
                    {serverData.map(data =>
                        <ComponentSetting key={data.name} data={data} />,
                    )}
                </StyledSettings>
            </StyledModal>
        </Modal>
    );
};
//
// margin: 35px;
// border-bottom: 1px solid darkgray;
// padding-bottom: 30px;

export default (ComponentSettings);
