import { Client, GuildMember, Message } from 'discord.js';
import { Pool } from 'mysql';

export type IEventTypes = 'messageCreate' | 'guildMemberCreate';

export type IEvent = (
    client: Client,
    databaseConnection: Pool,
) => void;

export type IEventMessageCreate = (
    client: Client,
    databaseConnection: Pool,
    message: Message,
) => void;

export type IEventGuildMemberAdd = (
    client: Client,
    databaseConnection: Pool,
    guildMember: GuildMember,
    guildId: string,
) => void;
