const Canvas = require('canvas');
const Discord = require('discord.js');
const createEmbedMessage = require('./createEmbedMessage');
const addTextElement = require('./addTextElement');
const addAvatarElement = require('./addAvatarElement');
const getTextWithVariablesAdded = require('./getTextWithVariablesAdded');

module.exports.run = (member, guild, values, services, language, isPrivate) => {
    const background = values[0];
    const avatar = values[1];
    let messageData = values[2];
    let elements = values[3];

    if (isPrivate) {
        if (!values[5]) {
            return false;
        }
        messageData = values[5]
        elements = values[6];
    } else if (!messageData) {
        return false;
    }

    const descriptionIndex = services.random.intMax(messageData.descriptions.length);

    if (!messageData.withCustomPicture) {
        return createEmbedMessage.run(language, messageData.color, messageData.timestamp, messageData.footer, messageData.descriptions[descriptionIndex]);
    }

    const {createCanvas} = Canvas;

    const canvas = createCanvas(1772, 633);
    let ctx = canvas.getContext('2d');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#f2f2f2';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    elements.forEach(element => {
        if (element.type === 'text') {
            ctx = addTextElement.run(ctx, member, guild, element);
        } else if (element.type === 'avatar') {
            ctx = addAvatarElement.run(ctx, element, avatar);
        }
    });

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    const description = getTextWithVariablesAdded.run(messageData.descriptions[descriptionIndex], member, guild);

    const welcomeEmbed = createEmbedMessage.run(language, messageData.color, messageData.timestamp, messageData.footer, description, attachment);

    if (attachment) {
        return {embeds: [welcomeEmbed], files: [attachment]};
    }

    return {embeds: [welcomeEmbed]};
};

