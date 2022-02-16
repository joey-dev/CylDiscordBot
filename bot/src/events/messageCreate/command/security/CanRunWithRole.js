const CanRunWithRole = (message, data) => {
    const roles = message.member.roles;

    const objectData = JSON.parse(data.server_data);
    const roleData = objectData.find(dataPart => dataPart.name === 'role');

    let roleFound = false;
    for (const role of roleData.data.roles) {
        if (roles.resolve(role.id) !== null) {
            roleFound = true;
            break;
        }
    }

    if (roleData.turned_on) {
        return roleFound;
    }

    return !roleFound;
};

module.exports = CanRunWithRole;
