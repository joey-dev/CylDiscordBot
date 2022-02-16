const Command = require('../../../connection/Command');
const tables = require('../../../structure');

const GetDataAndTurnedOnForComponent = (serverId, componentName, databaseConnection, callback) => {
    const sql =
        `
            SELECT \`component\`.\`${tables.Component.name}\`,
                   \`component\`.\`${tables.Component.data}\`,
                   \`component_settings\`.\`${tables.Component_settings.turned_on}\`,
                   \`component_settings\`.\`${tables.Component_settings.data}\` AS 'server_data', \`plugin_settings\`.\`${tables.Plugin_settings.turned_on}\` as 'plugin_enabled'
            FROM \`component\`
                     INNER JOIN \`component_settings\`
                                ON \`component_settings\`.\`${tables.Component_settings.component_id}\` = \`component\`.\`${tables.Component.id}\`
                     INNER JOIN \`server\`
                                ON \`component_settings\`.\`${tables.Component_settings.server_id}\` = \`server\`.\`${tables.Server.id}\`
                     INNER JOIN \`plugin\`
                                ON \`component\`.\`${tables.Component.plugin_id}\` = \`plugin\`.\`${tables.Plugin.id}\`
                     INNER JOIN \`plugin_settings\`
                                ON \`plugin_settings\`.\`${tables.Plugin_settings.plugin_id}\` = \`plugin\`.\`${tables.Plugin.id}\`


            WHERE \`server\`.\`${tables.Server.server_id}\` = ${serverId}
              AND \`component\`.\`name\` = '${componentName}';
        `;

    Command(sql,
        databaseConnection,
        ((error, result) => {
            callback(error, result[0]);
        }),
    );
};

module.exports = GetDataAndTurnedOnForComponent;
