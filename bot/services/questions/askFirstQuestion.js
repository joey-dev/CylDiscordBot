module.exports.finishPromises = {};

module.exports.run = (authorMessage, questions, finished) => {
    const serviceApiQuestions = require("../api/questions/index.js");

    serviceApiQuestions.setQuestions(authorMessage, questions);

    authorMessage.reply(questions[questions[questions.length - 1]].question);

    this.finishPromises[authorMessage.author.id] = finished;
}
