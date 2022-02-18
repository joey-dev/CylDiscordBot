import { Message } from 'discord.js';
import { IComponent } from '../../../../types/Commands';


const IsCommandEnabled = (message: Message, data: IComponent): boolean => data.turned_on === 1 && data.plugin_enabled === 1;

export default IsCommandEnabled;
