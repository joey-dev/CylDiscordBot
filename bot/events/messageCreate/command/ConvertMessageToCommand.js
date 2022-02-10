const ConvertMessageToCommand = (message, prefix) => {
    const commandWithoutPrefix = message.content.slice(prefix.length);
    return commandWithoutPrefix.replace(/\s/g, '_').toUpperCase();
};

module.exports = ConvertMessageToCommand;
