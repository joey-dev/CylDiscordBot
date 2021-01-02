import pkg from 'custom-env';
import fs from "fs";
import prompt from "prompt";
import SetBotSettingsChannelId from './setBotSettingsChannelId.js';
import SetDiscordBotToken from './setDiscordBotToken.js';

class StartCyl {
    constructor(finishedCommand) {
        this.checkOrFixEnv((discordToken) => {
            this.getAndSetMainServerId((mainServerId) => {
                this.checkOrFixSettings(mainServerId, () => {
                    finishedCommand(discordToken);
                })
            })
        });
    }

    checkOrFixEnv(finishedCommand) {
        console.log("Checking if the bot has already been set-up");

        if (!fs.existsSync('.env.local')) {
            console.log("Env file not found, creating one...");

            fs.copyFileSync('.env.template', '.env.local');
        } else {
            console.log("Env file found");
        }

        console.log("Checking for env file integrity...");

        const { env } = pkg;
        env('local');
        if (process.env.DISCORD_TOKEN) {
            if (process.env.DISCORD_TOKEN === "DISCORD_TOKEN") {
                console.log("Env file has not jet been filled in.");
                new SetDiscordBotToken((discordToken) => {
                    finishedCommand(discordToken);
                });

            } else {
                console.log("Check completed!");
                console.log("Do you want to change your discord token? (Yes/No)");

                prompt.start();
                prompt.get(["Change"], function (err, result) {
                    if (err) { return onErr(err); }
                    if (result.Change == "yes") {
                        new SetDiscordBotToken((discordToken) => {
                            finishedCommand(discordToken);
                        });
                    } else if (result.Change == "no") {
                        finishedCommand()
                    } else {
                        console.log("You filled in something else than yes, or no. I will take that as a no.");
                        finishedCommand();
                    }
                });
            }
        }
    }

    getAndSetMainServerId(finishedCommand) {
        const mainServerInfoJson = fs.readFileSync('Data/mainServerInfo.json');
        const mainServerInfo = JSON.parse(mainServerInfoJson);

        if (mainServerInfo['id'] === "null") {
            console.log("Please fill in the main server id");

            prompt.start();
            prompt.get(["id"], function (err, result) {
                if (err) { return onErr(err); }

                mainServerInfo['id'] = result.id;

                const mainServerInfoJson = JSON.stringify(mainServerInfo);
                fs.writeFileSync('Data/mainServerInfo.json', mainServerInfoJson);

                finishedCommand(result.id);
            });
        } else {
            console.log("Do you want to change the main server id?");
            prompt.start();
            prompt.get(["Change"], function (err, result) {
                if (err) { return onErr(err); }

                if (result.Change == "yes") {
                    prompt.start();
                    prompt.get(["id"], function (err, result) {
                        if (err) { return onErr(err); }

                        mainServerInfo['id'] = result.id;

                        const mainServerInfoJson = JSON.stringify(mainServerInfo);
                        fs.writeFileSync('Data/mainServerInfo.json', mainServerInfoJson);


                        finishedCommand(result.id);
                    });
                } else if (result.Change == "no") {
                    finishedCommand()
                } else {
                    console.log("You filled in something else than yes, or no. I will take that as a no.");
                    finishedCommand();
                }
            });
        }
    }

    checkOrFixSettings(mainServerId, finishedCommand) {
        if (!fs.existsSync("Data/" + mainServerId)){
            fs.mkdirSync("Data/" + mainServerId);
            fs.mkdirSync("Data/" + mainServerId + "/Events");
            fs.mkdirSync("Data/" + mainServerId + "/Settings");
        }

        if (!fs.existsSync('Data/' + mainServerId + '/Settings/bot.json')) {
            console.log("Bot settings not found, creating file...");
            fs.copyFileSync('Data/Template/Settings/bot.json', 'Data/' + mainServerId + '/Settings/bot.json');
        }

        if (!fs.existsSync('Data/' + mainServerId + '/Settings/general.json')) {
            console.log("General settings not found, creating file...");
            fs.copyFileSync('Data/Template/Settings/general.json', 'Data/' + mainServerId + '/Settings/general.json');
        }

        if (!fs.existsSync('Data/' + mainServerId + '/Settings/hosting.json')) {
            console.log("Hosting settings not found, creating file...");
            fs.copyFileSync('Data/Template/Settings/hosting.json', 'Data/' + mainServerId + '/Settings/hosting.json');
        }

        if (!fs.existsSync('Data/' + mainServerId + '/Settings/roleRequest.json')) {
            console.log("Role request settings not found, creating file...");
            fs.copyFileSync('Data/Template/Settings/roleRequest.json', 'Data/' + mainServerId + '/Settings/roleRequest.json');
        }

        if (!fs.existsSync('Data/' + mainServerId + '/Settings/welcome.json')) {
            console.log("Welcome settings not found, creating file...");
            fs.copyFileSync('Data/Template/Settings/welcome.json', 'Data/' + mainServerId + '/Settings/welcome.json');
        }

        if (!fs.existsSync('Data/' + mainServerId + '/Events/hosting.json')) {
            console.log("Hosting events data not found, creating file...");
            fs.copyFileSync('Data/Template/Events/hosting.json', 'Data/' + mainServerId + '/Events/hosting.json');
        }

        if (!fs.existsSync('Data/' + mainServerId + '/Events/questions.json')) {
            console.log("Questions events data not found, creating file...");
            fs.copyFileSync('Data/Template/Events/questions.json', 'Data/' + mainServerId + '/Events/questions.json');
        }

        const botSettingsJson = fs.readFileSync('Data/' + mainServerId + '/Settings/bot.json');
        const botSettings = JSON.parse(botSettingsJson);

        if (botSettings['channelId'] === "null") {
            new SetBotSettingsChannelId(botSettings, () => {
                finishedCommand();
            });
        } else {
            console.log("The bot settings channel id is correct, want to change it?");

            prompt.start();
            prompt.get(["Change"], function (err, result) {
                if (err) { return onErr(err); }

                if (result.Change == "yes") {
                    new SetBotSettingsChannelId(botSettings, () => {
                        finishedCommand();
                    });
                } else if (result.Change == "no") {
                    finishedCommand()
                } else {
                    console.log("You filled in something else than yes, or no. I will take that as a no.");
                    finishedCommand();
                }
            });
        }
    }
}

export default StartCyl;
