const Canvas = require('canvas');

module.exports.run = (client, member, guild, services, callback) => {
    services.database.tables.welcomeMessage.get(guild.id, services, ((error, welcomeMessageData) => {
        if (!welcomeMessageData) {
            callback(false);
            return;
        }

        Promise.all([
            getCanvasImage(),
            getUserAvatar(member),
        ]).then(values => {
            values[2] = JSON.parse(welcomeMessageData.messageData);
            values[3] = JSON.parse(welcomeMessageData.elements);
            values[4] = welcomeMessageData.channel_id;
            callback(values);
        });
    }));
};

function getCanvasImage() {
    const {loadImage} = Canvas;
    return loadImage(`./images/welcome/emptyWelcomeImage.png`);
}

function getUserAvatar(member) {
    const {loadImage} = Canvas;
    return loadImage(member.displayAvatarURL({format: 'jpg'}));
}
