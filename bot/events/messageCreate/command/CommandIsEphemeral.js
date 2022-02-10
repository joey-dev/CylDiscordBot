const CommandIsEphemeral = data => {
    const objectData = JSON.parse(data.server_data);
    const ephemeralData = objectData.find(dataPart => dataPart.name === 'ephemeral');

    return ephemeralData['turned_on'];
};

module.exports = CommandIsEphemeral;
