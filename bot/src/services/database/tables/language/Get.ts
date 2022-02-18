import { Pool } from 'mysql';
import { ILanguage } from '../../../../types/Database';
import Command from '../../connection/Command';
import Structure from '../../structure/Structure';


const Get = async (server_id: string, databaseConnection: Pool) => {
    return await Command<ILanguage>(
        'SELECT `language`.`' + Structure.Language.name + '`, `language`.`' + Structure.Language.small_name + '`' +
        'FROM `language` ' +
        'INNER JOIN `server` ON `server`.`' + Structure.Server.language_id + '` = `language`.`' + Structure.Language.id + '` ' +
        'WHERE `server`.`' + Structure.Server.server_id + '` = ' + server_id,
        databaseConnection
    );
};

export default Get;
