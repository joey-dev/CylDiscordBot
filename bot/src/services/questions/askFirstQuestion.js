module.exports.finishPromises = {};

module.exports.run = (authorMessage, questions, language, finished) => {
    const serviceApiQuestions = require("../api/questions");

    serviceApiQuestions.setQuestions(authorMessage, questions);

    authorMessage.reply(questions[questions[questions.length - 1]].question[language.name]);

    this.finishPromises[authorMessage.author.id] = finished;
}
