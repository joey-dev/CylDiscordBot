const info = {
    name: 'HELP',
    description: 'HELP_DESCRIPTION',
    title: 'HELP_TITLE',
    fieldName: 'HELP_FIELD_NAME',
    ownerOnly: false,
    testersOnly: true,
    type: 'public',
};

const run = async (client, message, args, services, language) => {
    const helpMenu = services.messages.helpMenu(client, message, args, services, language);

    if (helpMenu) {
        message.channel.send({embeds: [helpMenu]}).catch(e => {
            console.error(e);
        });
    }
};


module.exports = {
    run,
    info,
};
