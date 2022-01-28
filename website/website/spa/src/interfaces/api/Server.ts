import { Language } from './Language';

export interface Server {
    id: string,
    name: string,
    icon: string|null,
    owner: boolean,
    permissions: string,
    features: string[],
    alreadyJoined: boolean
}

export interface DetailedServer {
    name: string,
    command_prefix: string,
    language: Language
}
