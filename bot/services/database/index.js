const fs = require('fs');


const modules = fs.readdirSync(__dirname).filter(module => !module.endsWith(".js") && module !== "structure");

modules.forEach(moduleName => {
    module.exports[moduleName] = require('./' + moduleName);
});
