import prompt from 'prompt';
import fs from "fs";

class SetDiscordBotToken {
    constructor(completionScript) {
        console.log("please fill in your discord bot token.");

        prompt.start();
        prompt.get(["DiscordToken"], function (err, result) {
            if (err) { return onErr(err); }

            const localEnv = fs.readFileSync('.env.local', {encoding:'utf8', flag:'r'});
            let localEnvKeyValue = localEnv.split("=");
            localEnvKeyValue[1] = result.DiscordToken;

            fs.writeFileSync('.env.local', localEnvKeyValue[0] + "=" + localEnvKeyValue[1]);

            console.log("discord bot token set.");
            completionScript(result.DiscordToken);
        });
    }
}

export default SetDiscordBotToken;
