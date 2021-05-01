/**
 * @param message {Message}
 * @param title {String}
 * @param description {String}
 * @param deleteAfter {Boolean}
 * @param services
 */
module.exports.run = (message, title, description, deleteAfter = true, services) => {
    return message.reply({
        embed: {
            color: 0xe5cc0b,
            title: title,
            description: description
        }
    }).then(msg => {
        if (deleteAfter) {
            msg.delete({ timeout: 5000 })
        }
    });
}
