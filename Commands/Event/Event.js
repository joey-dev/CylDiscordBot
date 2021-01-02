import fs from "fs";
import Host from './Host/Index.js';

class Event {
    constructor(command, message, args, client) {
        const EventsQuestionsJson = fs.readFileSync('Data/Events/questions.json');
        const EventsQuestions = JSON.parse(EventsQuestionsJson);

        if (message.channel.id === process.env.HOSTING_CHANNEL_ID) {
            this.startEvent(message, client, EventsQuestions);
        }
    }

    startEvent(message, client, settings) {
        let author = message.author;
        let completed = false;

        message.reply(settings.message);

        client.on('message', message => {
            if (!completed && message.author.id === author.id) {
                completed = true;

                switch (message.content) {
                    case "host":
                        new Host(message, client, settings, author);
                        break;
                }
            }


        })
    }
}

export default Event;
