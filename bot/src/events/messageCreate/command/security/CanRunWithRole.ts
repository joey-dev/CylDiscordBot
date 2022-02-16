import { Message } from 'discord.js';
import { IComponent, IComponentData, IComponentDataRoles } from '../../../../types/Commands';


const CanRunWithRole = (message: Message, data: IComponent): boolean => {
    if (!message.member) {
        return false;
    }
    const roles = message.member.roles;

    const objectData = JSON.parse(data.server_data) as IComponentData[];
    const roleData = objectData.find(dataPart => dataPart.name === 'role');

    if (!roleData || !roleData.data || !roleData.turned_on) {
        return false;
    }

    const componentData = roleData.data as IComponentDataRoles;

    let roleFound = false;
    for (const role of componentData.roles) {
        if (roles.resolve(role.id) !== null) {
            roleFound = true;
            break;
        }
    }

    return roleFound;
};

export default CanRunWithRole;
