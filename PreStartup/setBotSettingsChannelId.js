import fs from "fs";
import prompt from 'prompt';

class SetBotSettingsChannelId {
    constructor(botSettings, finishedCommand) {
        console.log("Please fill in the bot settings channel id");
        prompt.start();
        prompt.get(["Change"], function (err, result) {
            if (err) { return onErr(err); }
            botSettings['channelId'] = result.Change;

            const jsonBotSettings = JSON.stringify(botSettings);
            fs.writeFileSync('Data/Template/Settings/bot.json', jsonBotSettings);
            finishedCommand();
        });
    }
}

export default SetBotSettingsChannelId;
