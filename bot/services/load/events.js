const fs = require('fs');


module.exports.run = async (client, services) => {
    try {
        fs.readdir(`./events/`, (error, files) => {
            if (error) console.log(error);

            files.forEach(file => {
                let eventFunction = require(`../../events/${file}`);
                let eventName = file.split(".")[0];

                console.log(`Loading event: ${eventName}`);

                client.on(eventName, (...args) => eventFunction.run(client, ...args, services));
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
