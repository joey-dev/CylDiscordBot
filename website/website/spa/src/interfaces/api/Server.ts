import { ILanguage } from './Language';

export interface IServer {
    id: string,
    name: string,
    icon: string|null,
    owner: boolean,
    permissions: string,
    features: string[],
    alreadyJoined: boolean
}

export interface IDetailedServer {
    name: string,
    command_prefix: string,
    language: ILanguage
}
