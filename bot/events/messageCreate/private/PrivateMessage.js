const PrivateMessage = (client, services, message) => {
    const prefix = '!';
    const language = {
        'name': 'EnglishUs',
        'small_name': 'EnglishUs',
    };

    if (message.content.indexOf(prefix) === 0) {
        runCommand(client, message, services, language, true, prefix);
    } else {
        runMessage(client, message, services, language, true, prefix);
    }
};

module.exports = PrivateMessage;
