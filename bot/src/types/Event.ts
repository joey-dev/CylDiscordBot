import { Client, GuildMember, GuildUnavailable, Message } from 'discord.js';
import { Pool } from 'mysql';
import { ICommands } from './Commands';

export type IEventTypes = 'messageCreate' | 'guildMemberAdd' | 'ready' | 'guildDelete';

export type IEvent = (
    client: Client,
    databaseConnection: Pool,
) => void;

export type IEventMessageCreate = (
    client: Client,
    databaseConnection: Pool,
    message: Message,
    commands: ICommands,
) => Promise<void>;

export type IEventGuildMemberAdd = (
    client: Client,
    databaseConnection: Pool,
    guildMember: GuildMember,
) => Promise<void>;

export type IEventGuildRemove = (
    client: Client,
    databaseConnection: Pool,
    guild: GuildUnavailable,
) => Promise<void>;

export type IEventReact = (
    client: Client,
) => Promise<void>;
