import { Message } from 'discord.js';
import { IComponentData, IComponentDataDeleteReply } from '../../../../types/Commands';


const DeleteReply = (message: Message, objectData: IComponentData[]) => {
    const deleteReplyData = objectData.find(dataPart => dataPart.name === 'deleteReply');
    const millisecondsInSeconds = 1000;

    if (!deleteReplyData) {
        return;
    }

    if (deleteReplyData.turned_on) {
        const deleteReplyDataData = deleteReplyData.data as IComponentDataDeleteReply;

        setTimeout(function() {
            message.delete();
        }, parseInt(deleteReplyDataData.second, 10) * millisecondsInSeconds);
    }
};

export default DeleteReply;
