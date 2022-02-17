// This line is required for the existing types/interfaces to still be functional
import * as discordJs from 'discord.js';

declare module 'discord.js' {
    export interface GuildUnavailable {
        id: string,
        unavailable?: boolean;
    }
}

