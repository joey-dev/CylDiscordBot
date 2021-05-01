module.exports.run = async (client, message, args, services) => {
    try {
        console.log('reloading files');
        client.serviceRequires.push(() => {
            services = require('../../../services/index');
        });

        services.load.files(client, services);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "refresh files",
    cmdName: "refresh files",
    alias: [],
    description: "Refreshes all the files, new files will be added from the changes folder",
    ownerOnly: true,
    testersOnly: false,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["refresh files"],
    example: ["refresh files"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}
