import React from 'react';
import styled from 'styled-components';
import ServerLogo from '../../../../atoms/images/ServerLogo';
import { IServer } from '../../../../../interfaces/api/Server';
import arrowDown from '../../../../../assets/icons/arrowDown.svg';
import check from '../../../../../assets/icons/check.svg';
import uncheck from '../../../../../assets/icons/uncheck.svg';


type StyledMainDivProps = {
    clickable: boolean;
}

const StyledMainDiv = styled.div<StyledMainDivProps>`
    border: 1px solid black;
    border-radius: 8px;
    padding: 6px 12px;
    background-color: black;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: ${(props: StyledMainDivProps) => props.clickable ? "pointer" : "auto"};
`;

const NameAndLogoDiv = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    width: calc(100% - 25px);
`;

type StyledServerNameProps = {
    size: number;
}

const StyledServerName = styled.p<StyledServerNameProps>`
    font-size: ${(props: StyledServerNameProps) => props.size/2.5}px;
    margin-left: 10px;
    overflow: hidden;
    max-height: 24px;
    max-width: 155px;
`;

const StyledDivImg = styled.div`
    height: 25px;
`;

type StyledArrowDownImgProps = {
    listOpen: boolean;
}

const StyledArrowDownImg = styled.img<StyledArrowDownImgProps>`
    width: 25px;
    transform: rotate(${(props: StyledArrowDownImgProps) => (props.listOpen ? 180 : 0)}deg);
    transition: transform 0.4s ease;
`;

const StyledCheckImg = styled.img`
    width: 25px;
`;

const StyledUnCheckImg = styled.img`
    width: 20px;
    padding: 2.5px
`;

type Props = {
    server?: IServer;
    isCurrentServer: boolean;
    listOpen: boolean;
    onArrowClick: () => void;
    onServerClick: (serverId: string|undefined) => void;
};

const ServerItem: React.FC<Props> = (props: Props) => {
    const size = 40;

    let serverLogo;
    let serverName = 'Select a server';

    if (props.server) {
        serverLogo = <ServerLogo size={size} server={props.server} />;
        serverName = props.server.name;
    }

    return (
        <StyledMainDiv onClick={() => props.onServerClick(props.server?.id)} clickable={!props.isCurrentServer}>
            <NameAndLogoDiv>
                {serverLogo}
                <StyledServerName size={size}>
                    {serverName}
                </StyledServerName>
            </NameAndLogoDiv>
            {props.isCurrentServer ? (
                <StyledDivImg>
                    <StyledArrowDownImg src={arrowDown} listOpen={props.listOpen} onClick={props.onArrowClick}/>
                </StyledDivImg>
            ): (
                props.server?.alreadyJoined ? (
                    <StyledDivImg>
                        <StyledCheckImg src={check} />
                    </StyledDivImg>
                ) : (
                    <StyledDivImg>
                        <StyledUnCheckImg src={uncheck} />
                    </StyledDivImg>
                )
            )}
        </StyledMainDiv>
    );
};

export default ServerItem;
