const Canvas = require('canvas');
const welcome = require('../../../../database/structure/welcome');

module.exports.run = (client, member, guild, services, callback) => {
    services.database.tables.welcomeMessage.get(guild.id, services, ((error, welcomeDatabaseRow) => {
        if (!welcomeDatabaseRow) {
            callback(false);
            return;
        }

        Promise.all([
            getCanvasImage(),
            getUserAvatar(member),
        ]).then(values => {
            values[2] = JSON.parse(welcomeDatabaseRow[welcome.message_data]);
            values[2] = JSON.parse(welcomeDatabaseRow[welcome.message_data]);
            values[3] = JSON.parse(welcomeDatabaseRow[welcome.elements]);
            values[4] = welcomeDatabaseRow[welcome.channel_id];
            values[5] = JSON.parse(welcomeDatabaseRow[welcome.private_message_data]);
            values[6] = JSON.parse(welcomeDatabaseRow[welcome.private_elements]);
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
