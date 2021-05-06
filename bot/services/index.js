const fs = require('fs');


const modules = fs.readdirSync(__dirname).filter(module => !module.endsWith(".js"));

console.log(modules);

modules.forEach(moduleName => {
    module.exports[moduleName] = require('./' + moduleName);
});


// module.exports.api = require("./api/index");
// module.exports.load = require("./load/index");
// module.exports.messages = require("./messages/index");
// module.exports.question = require("./questions/index");
// module.exports.settings = require("./settings");
