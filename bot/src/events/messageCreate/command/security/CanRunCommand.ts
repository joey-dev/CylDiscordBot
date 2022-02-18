import { Message } from 'discord.js';
import { IComponent } from '../../../../types/Commands';
import CanRunOnChannel from './CanRunOnChannel';
import CanRunWithRole from './CanRunWithRole';
import IsCommandEnabled from './IsCommandEnabled';


const CanRunCommand = (message: Message, data: IComponent): boolean => {
    return (IsCommandEnabled(message, data) &&
        CanRunOnChannel(message, data) &&
        CanRunWithRole(message, data));
};

export default CanRunCommand;
