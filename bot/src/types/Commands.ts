import { Client, Message } from 'discord.js';


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
    args: string[],
    language: string,
    ephemeral: boolean,
) => void;

export interface ICommandInfo {
    name: string;
    type: ICommandTypes;
}

export type ICommandTypes = 'public' | 'private' | 'privateAndPublic';
