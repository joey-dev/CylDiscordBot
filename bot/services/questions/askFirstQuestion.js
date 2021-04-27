module.exports.finishPromises = {};

module.exports.run = (authorMessage, questions, finished) => {
    let questionIndex = 0;
    const serviceApiQuestions = require("../api/questions/index.js");

    serviceApiQuestions.setQuestions(authorMessage, questions, questionIndex);

    authorMessage.reply(questions[questionIndex].question);

    this.finishPromises[authorMessage.id] = finished;
}
