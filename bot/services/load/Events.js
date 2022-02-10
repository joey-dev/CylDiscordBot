const fs = require('fs');


const Events = async (client, databaseConnection) => {
    try {
        fs.readdir(`./events/`, (error, files) => {
            if (error) console.log(error);

            files.forEach(file => {
                const eventFunction = require(`../../events/${file}/index.js`);

                console.log(`Loading event: ${file}`);

                client.on(file, (...args) => eventFunction.run(client, databaseConnection, ...args));
            });
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = Events;
