module.exports.run = (client, member, guild, services, language, callback) => {
    require("./privateServices/getValues").run(client, member, guild, services, data => {
        if (!data) {
            callback(false);
            return;
        }

        callback(
            require("./privateServices/generateImageWithText").run(member, guild, data, services, language, false),
            require("./privateServices/generateImageWithText").run(member, guild, data, services, language, true),
            data);
    });
}
