module.exports.run = async (client, message, args, functions) => {
    try {
        const questions = require("../../services/questions/index.js");

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
            }
        ];

        questions.askFirstQuestion(message, questionsToAsk, (message, answers) => {
            console.log(answers);
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
