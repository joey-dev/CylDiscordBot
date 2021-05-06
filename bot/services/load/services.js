const fs = require('fs');


module.exports.run = async (client, change, services) => {
    try {
        console.log('refresh services');

        console.log(services);

        services.files.watch(client, "./services", folderName => {
            console.log(services);
            console.log(folderName);
            services[folderName].loadModules(client, services);
            change(services.files.require(client, "../../services/" + folderName + "/index.js", services));
        }, services);
    }
    catch (e) {
        console.log(e);
    }
}
