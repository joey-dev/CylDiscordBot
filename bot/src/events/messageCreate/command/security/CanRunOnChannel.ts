import { Message } from 'discord.js';
import { IComponent, IComponentData, IComponentDataChannels } from '../../../../types/Commands';

const CanRunOnChannel = (message: Message, data: IComponent): boolean => {
    const channel = message.channel;
    const channelIdAsString = channel.id.toString();

    const objectData = JSON.parse(data.server_data) as IComponentData[];
    const channelData = objectData.find(dataPart => dataPart.name === 'channel');

    if (!channelData || !channelData.data || !channelData.turned_on) {
        return false;
    }
    const componentData = channelData.data as IComponentDataChannels;

    const foundChannel = componentData.channels.find(searchChannel => searchChannel.id === channelIdAsString);

    return !!(foundChannel);
};

export default CanRunOnChannel;
