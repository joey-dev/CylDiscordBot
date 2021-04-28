module.exports.finishPromises = {};

module.exports.run = (message) => {
    const serviceApiQuestions = require("../api/questions/index.js");

    const questions = serviceApiQuestions.getQuestions(message.author.id);

    if (questions) {
        let oldQuestionKey = questions[questions.length - 1];
        questions[oldQuestionKey].answer = message.content;
        const question = questions[oldQuestionKey];

        let foundAnswer = false;

        Object.keys(question.nextQuestion).forEach(index => {
            if (index === question.answer) {
                foundAnswer = true;
                questions[questions.length - 1] = question.nextQuestion[index];
            }
        });

        if (!foundAnswer) {
            questions[questions.length - 1] = question.nextQuestion['_default'];
        }

        let newQuestionKey = questions[questions.length - 1];
        let newQuestion = questions[newQuestionKey];

        if (!('finish' in newQuestion)) {
            serviceApiQuestions.setQuestions(message, questions);

            message.reply(newQuestion.question);
        } else {
            serviceApiQuestions.deleteQuestions(message, questions);
            message.reply(newQuestion.finish);

            const askFirstQuestion = require("./askFirstQuestion");
            askFirstQuestion.finishPromises[message.author.id](message, questions);
        }
    }
}
