import { Message } from 'discord.js';
import { IComponent, IComponentData } from '../../../../types/Commands';
import DeleteCommand from './DeleteCommand';
import DeleteReply from './DeleteReply';


const AfterCommandFinished = (message: Message, responseMessage: Message, data: IComponent) => {
    const objectData = JSON.parse(data.server_data) as IComponentData[];

    DeleteCommand(message, objectData);
    DeleteReply(responseMessage, objectData);
};

export default AfterCommandFinished;
