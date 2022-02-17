import { Client, GuildMember } from 'discord.js';
import { Pool } from 'mysql';
import { IEventGuildMemberAdd } from '../../types/Event';

const GuildMemberAdd: IEventGuildMemberAdd = async (client: Client, databaseConnection: Pool, guildMember: GuildMember): Promise<void> => {
    if (!guildMember.guild) {
        return;
    }
};

export default GuildMemberAdd;
