import { ILanguage } from '@cylbot/cyldiscordbotlanguage/index';
import { Client, Message } from 'discord.js';
import { ILanguage as ILanguageDatabase } from './Database';


export interface IInfo {
    name: keyof ILanguage;
    description: keyof ILanguage;
    title: keyof ILanguage;
    fieldName: keyof ILanguage;
    ownerOnly: boolean;
    testersOnly: boolean;
    type: ICommandTypes;
}

export interface IComponent {
    name: string;
    data: string;
    turned_on: number;
    server_data: string;
    plugin_enabled: number;
}

export interface IComponentData {
    name: string;
    turned_on: boolean;
    data?: IComponentDataChannels|IComponentDataRoles|IComponentDataDeleteReply;
}

export interface IComponentDataChannels {
    channels: IComponentDataChannel[];
}

export interface IComponentDataChannel {
    id: string;
    name: string;
}

export interface IComponentDataRoles {
    roles: IComponentDataRole[];
}

export interface IComponentDataRole {
    id: string;
    name: string;
}

export interface IComponentDataDeleteReply {
    second: string;
}



export interface ICommands {
    publicCommands: ICommandObject[];
    privateCommands: ICommandObject[];
}

export interface ICommandObject {
    name: string,
    command: ICommand;
}

export interface ICommand {
    run: ICommandRun;
    info: ICommandInfo;
}

export type ICommandRun = (
    client: Client,
    message: Message,
    args: string,
    language: ILanguageDatabase,
    ephemeral: boolean,
) => Promise<Message>;

export interface ICommandInfo {
    name: string;
    type: ICommandTypes;
}

export type ICommandTypes = 'public' | 'private' | 'privateAndPublic';
