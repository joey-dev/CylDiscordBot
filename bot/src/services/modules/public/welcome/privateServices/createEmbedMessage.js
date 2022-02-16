const Discord = require("discord.js");


module.exports.run = (language, color, timeStamp, footer, description, attachment = false) => {
    let embedMessage = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(description)
        .setImage('attachment://welcome-image.png')

    let footerText = "";

    if (footer) {
        footerText += footer;
    }

    if (timeStamp) {
        if (footer) {
            footerText += " • ";
        }
        const date = new Date();
        const day = date.getDate();
        const month = date.toLocaleString(language.short_name, { month: 'short' });
        const year = date.getFullYear();
        const hour = addZero(date.getHours());
        const minutes = addZero(date.getMinutes());

        footerText += hour + ":" + minutes + " " + day + " " + month + " " + year;
    }

    if (footerText !== "") {
        embedMessage.setFooter({text: footerText});
    }

    return embedMessage;
};

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}
