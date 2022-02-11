const info = {
    name: 'ARGS',
    description: 'ARGS_DESCRIPTION',
    title: 'ARGS_TITLE',
    fieldName: 'ARGS_FIELD_NAME',
    ownerOnly: false,
    testersOnly: true,
    type: 'public',
};

const run = async (client, message, args, services) => {
    try {
        let fields = [];
        args.forEach((argument, key) => {
            fields.push({
                name: 'Argument ' + key,
                value: argument,
                inline: true
            });
        });

        message.reply({
            embed: {
                color: 0xe5cc0b,
                title: `Here are the args: `,
                fields: fields
            }
        });
    }
    catch (e) {
        console.log(e);
    }
}


module.exports = {
    run,
    info,
};
