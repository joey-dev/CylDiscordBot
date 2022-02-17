import { Pool } from 'mysql';
import { IComponent } from '../../../../types/Commands';
import Command from '../../connection/Command';
import Structure from '../../structure/Structure';


const GetDataAndTurnedOnForComponent = (serverId: string, componentName: string, databaseConnection: Pool) => {
    const sql =
        `
            SELECT \`component\`.\`${Structure.Component.name}\`,
                   \`component\`.\`${Structure.Component.data}\`,
                   \`component_settings\`.\`${Structure.Component_settings.turned_on}\`,
                   \`component_settings\`.\`${Structure.Component_settings.data}\` AS 'server_data', 
                   \`plugin_settings\`.\`${Structure.Plugin_settings.turned_on}\` as 'plugin_enabled'
            FROM \`component\`
                     INNER JOIN \`component_settings\`
                                ON \`component_settings\`.\`${Structure.Component_settings.component_id}\` = \`component\`.\`${Structure.Component.id}\`
                     INNER JOIN \`server\`
                                ON \`component_settings\`.\`${Structure.Component_settings.server_id}\` = \`server\`.\`${Structure.Server.id}\`
                     INNER JOIN \`plugin\`
                                ON \`component\`.\`${Structure.Component.plugin_id}\` = \`plugin\`.\`${Structure.Plugin.id}\`
                     INNER JOIN \`plugin_settings\`
                                ON \`plugin_settings\`.\`${Structure.Plugin_settings.plugin_id}\` = \`plugin\`.\`${Structure.Plugin.id}\`


            WHERE \`server\`.\`${Structure.Server.server_id}\` = ${serverId}
              AND \`component\`.\`name\` = '${componentName}';
        `;

    return Command<IComponent>(sql,
        databaseConnection,
    );
};

export default GetDataAndTurnedOnForComponent;
