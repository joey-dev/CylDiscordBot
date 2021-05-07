module.exports.run = (member, roles) => {
    if (roles.length === 0) return;

    for (let roleIndex = 0; roleIndex < roles.length; roleIndex++) {
        member.guild.roles.fetch(roles[roleIndex])
            .then(role => {
                member.roles.add(role);
            });
    }
}
