module.exports.askFirstQuestion = (message, questions, finished) => {
    const askFirstQuestion = require("./askFirstQuestion");
    askFirstQuestion.run(message, questions, finished);
}

module.exports.askQuestions = (message, questions, finished) => {
    const askQuestions = require("./askQuestions");
    askQuestions.run(message, questions, finished);
}

