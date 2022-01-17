module.exports.run = async (client, message, args, services, language) => {
    try {
        const questions = require("../../../services/questions");

        const questionsToAsk = [
            {
                "question": {
                    "EnglishUs": "Yes, or No?",
                    "Nederlands": "Ja, of Nee?"
                },
                "nextQuestion": [
                    {
                        "EnglishUs": "yes",
                        "Nederlands": "ja",
                        "goto": 1
                    },
                    {
                        "EnglishUs": "no",
                        "Nederlands": "nee",
                        "goto": 2
                    },
                    2
                ],
            },{
                "question": {
                    "EnglishUs": "Yes?",
                    "Nederlands": "Ja?"
                },
                "nextQuestion": [
                    {
                        "EnglishUs": "yes",
                        "Nederlands": "ja",
                        "goto": 3
                    },
                    {
                        "EnglishUs": "no",
                        "Nederlands": "nee",
                        "goto": 2
                    },
                    0
                ],
            },{
                "question": {
                    "EnglishUs": "No?",
                    "Nederlands": "Nee?"
                },
                "nextQuestion": [
                    {
                        "EnglishUs": "yes",
                        "Nederlands": "ja",
                        "goto": 1
                    },
                    {
                        "EnglishUs": "no",
                        "Nederlands": "nee",
                        "goto": 4
                    },
                    1
                ],
            },{
                "finish": {
                    "EnglishUs": "Yes, Finished",
                    "Nederlands": "Ja, Klaar"
                },
            },{
                "finish": {
                    "EnglishUs": "No, Finished",
                    "Nederlands": "Nee, Klaar"
                },
            },
            0
        ];

        questions.askFirstQuestion(message, questionsToAsk, language, (message, answers) => {
            let fields = [];
            answers.forEach((argument, key) => {
                if (argument.answer !== undefined) {
                    fields.push({
                        name: argument.question[language.name],
                        value: argument.answer,
                        inline: true
                    });
                }
            });

            fields.push({
                name: answers[answers[answers.length - 1]].finish[language.name],
                value: (answers.length - 1).toString(),
                inline: true
            });

            message.reply({
                embeds: [{
                    color: 0xe5cc0b,
                    title: `Here are the args: `,
                    fields: fields
                }]
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
    event: "message",
}
