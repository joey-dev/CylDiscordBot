const {isObj} = require('custom-env/lib/funcs');
module.exports.finishPromises = {};

module.exports.run = (message, services, language) => {
    const serviceApiQuestions = require("../api/questions/index.js");

    const questions = serviceApiQuestions.getQuestions(message.author.id);

    if (questions) {
        let oldQuestionKey = questions[questions.length - 1];
        questions[oldQuestionKey].answer = message.content;
        const question = questions[oldQuestionKey];

        let foundAnswer = false;
        let defaultGoto = null;
        Object.keys(question.nextQuestion).forEach(index => {
            if (!isObj(question.nextQuestion[index])) {
                defaultGoto = question.nextQuestion[index]
            } else if (question.nextQuestion[index][language.name] === question.answer) {
                foundAnswer = true;
                questions[questions.length - 1] = question.nextQuestion[index].goto;
            }
        });

        if (!foundAnswer) {
            if (defaultGoto === null) {
                console.error("There was no default goto in this question: " + question);
                defaultGoto = 0;
            }
            questions[questions.length - 1] = defaultGoto;
        }

        let newQuestionKey = questions[questions.length - 1];
        let newQuestion = questions[newQuestionKey];

        if (!('finish' in newQuestion)) {
            serviceApiQuestions.setQuestions(message, questions);
            message.reply(newQuestion.question[language.name]);
        } else {
            serviceApiQuestions.deleteQuestions(message, questions);
            message.reply(newQuestion.finish[language.name]);

            const askFirstQuestion = require("./askFirstQuestion");
            askFirstQuestion.finishPromises[message.author.id](message, questions);
        }
    }
}
