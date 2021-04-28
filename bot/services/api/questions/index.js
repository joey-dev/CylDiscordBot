module.exports.setQuestions = (message, questions) => {
    const setQuestions = require("./setQuestions");
    setQuestions.run(message, questions);
}

module.exports.getQuestions = (authorId) => {
    const getQuestions = require("./getQuestions");
    return getQuestions.run(authorId);
}

module.exports.deleteQuestions = (authorId) => {
    const deleteQuestions = require("./deleteQuestions");
    return deleteQuestions.run(authorId);
}
