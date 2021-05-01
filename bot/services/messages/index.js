/**
 * @param message {Message}
 * @param title {String}
 * @param description {String}
 * @param deleteAfter {Boolean}
 * @param services
 */
module.exports.alert = (message, title, description, deleteAfter, services) => {
    const alert = require("./alert");
    alert.run(message, title, description, deleteAfter, services);
}

/**
 * @param client
 * @param message {Message}
 * @param command
 * @param services
 * @return MessageEmbed|null
 */
module.exports.helpMenu = (client, message, command, services) => {
    console.log('test');
    const helpMenu = require("./helpMenu");
    return helpMenu.run(client, message, command, services);
}
