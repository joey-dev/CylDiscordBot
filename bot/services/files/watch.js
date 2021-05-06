const fs = require('fs');


module.exports.run = async (client, fileName, change, services) => {
    try {
        console.log('refresh services');

        fs.watch(fileName, function(event, filename) {
            if (event !== 'change') return;
            change(filename);
        });
    }
    catch (e) {
        console.log(e);
    }
}
