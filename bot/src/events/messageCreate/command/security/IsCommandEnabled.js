const tables = require('../../../../services/database/structure');


const IsCommandEnabled = (message, data) => data[tables.Component_settings.turned_on] === 1 && data['plugin_enabled'] === 1;

module.exports = IsCommandEnabled;
