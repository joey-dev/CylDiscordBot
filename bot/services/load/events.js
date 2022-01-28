const fs = require('fs');


module.exports.run = async (client, services) => {
    try {
        fs.readdir(`./events/`, (error, files) => {
            if (error) console.log(error);

            files.forEach(file => {
                let eventFunction = require(`../../events/${file}/index.js`);

                console.log(`Loading event: ${file}`);

                client.on(file, (...args) => eventFunction.run(client, services, ...args));
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
