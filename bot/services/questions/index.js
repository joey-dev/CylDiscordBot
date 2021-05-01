module.exports.askFirstQuestion = (message, questions, finished, services) => {
    const askFirstQuestion = require("./askFirstQuestion");
    askFirstQuestion.run(message, questions, finished, services);
}

module.exports.askQuestions = (message, questions, finished, services) => {
    const askQuestions = require("./askQuestions");
    askQuestions.run(message, questions, finished, services);
}

