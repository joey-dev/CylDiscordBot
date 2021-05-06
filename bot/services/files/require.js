const fs = require('fs');


module.exports.run = async (client, file, services) => {
    try {
        if (file in require.cache) {
            delete require.cache[file];
        }

        return require(file);
    }
    catch (e) {
        console.log(e);
    }
}
