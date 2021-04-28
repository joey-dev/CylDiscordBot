/**
 * @param message {Message}
 * @param title {String}
 * @param description {String}
 * @param deleteAfter {Boolean}
 */
module.exports.alert = (message, title, description, deleteAfter) => {
    const alert = require("./alert");
    alert.run(message, title, description, deleteAfter);
}

/**
 * @param client
 * @param message {Message}
 * @param command
 * @return MessageEmbed|null
 */
module.exports.helpMenu = (client, message, command) => {
    const helpMenu = require("./helpMenu");
    return helpMenu.run(client, message, command);
}
