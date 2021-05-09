module.exports.run = (client, member, guild, services, callback) => {
    require("./privateServices/getValues").run(client, member, guild, services, data => {
        if (!data) {
            callback(false);
            return;
        }

        callback(
            require("./privateServices/generateImageWithText").run(member, guild, data, services, false),
            require("./privateServices/generateImageWithText").run(member, guild, data, services, true),
            data);
    });
}
