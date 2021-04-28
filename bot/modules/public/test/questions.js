module.exports.run = async (client, message, args, functions) => {
    try {
        const questions = require("../../../services/questions");

        const questionsToAsk = [
            {
                "question": "Yes, or No?",
                "nextQuestion": {
                    "yes": 1,
                    "no": 2,
                    "_default": 2
                }
            },{
                "question": "Yes?",
                "nextQuestion": {
                    "yes": 3,
                    "no": 2,
                    "_default": 0
                }
            },{
                "question": "No?",
                "nextQuestion": {
                    "yes": 1,
                    "no": 4,
                    "_default": 1
                }
            },{
                "finish": "Yes, Finished",
            },{
                "finish": "No, Finished",
            },
            0
        ];

        questions.askFirstQuestion(message, questionsToAsk, (message, answers) => {
            let fields = [];
            answers.forEach((argument, key) => {
                if (argument.answer !== undefined) {
                    fields.push({
                        name: argument.question,
                        value: argument.answer,
                        inline: true
                    });
                }
            });

            fields.push({
                name: answers[answers[answers.length - 1]].finish,
                value: answers.length - 1,
                inline: true
            });

            message.reply({
                embed: {
                    color: 0xe5cc0b,
                    title: `Here are the args: `,
                    fields: fields
                }
            })
        });
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.help = {
    name: "test questions",
    cmdName: "testing questions",
    alias: [],
    description: "Checks if the bot is able to handle questions",
    ownerOnly: false,
    testersOnly: true,
    botPermissions: [],
    userPermissions: [],
    minAmountOfArguments: 0,
    usage: ["test questions"],
    example: ["test questions"],
    deleteCommandMessage: false,
    returnMessageOnError: true,
}
