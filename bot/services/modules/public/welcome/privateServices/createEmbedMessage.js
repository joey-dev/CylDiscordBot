const Discord = require("discord.js");


module.exports.run = (color, timeStamp, footer, description, attachment = false) => {
    let embedMessage = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(description)
        .setImage('attachment://welcome-image.png')

    if (attachment) {
        embedMessage.attachFiles(attachment);
    }

    if (timeStamp) {
        embedMessage.setTimestamp();
    }

    if (footer) {
        embedMessage.setFooter(footer);
    }

    return embedMessage;
};
