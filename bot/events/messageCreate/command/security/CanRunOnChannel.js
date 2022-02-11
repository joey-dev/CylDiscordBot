const CanRunOnChannel = (message, data) => {
    const channel = message.channel;
    const channelIdAsString = channel.id.toString();

    const objectData = JSON.parse(data.server_data);
    const channelData = objectData.find(dataPart => dataPart.name === 'channel');

    const foundChannel = channelData.data.channels.find(searchChannel => searchChannel.id === channelIdAsString);

    if (channelData.turned_on) {
        return (foundChannel);
    }

    return !(foundChannel);
};

module.exports = CanRunOnChannel;
