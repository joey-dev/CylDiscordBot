import { Message } from 'discord.js';
import { IComponentData } from '../../../../types/Commands';


const DeleteCommand = (message: Message, objectData: IComponentData[]) => {
    const deleteCommandData = objectData.find(dataPart => dataPart.name === 'deleteCommand');
    if (!deleteCommandData) {
        return;
    }

    if (deleteCommandData.turned_on) {
        message.delete();
    }
};

export default DeleteCommand;
