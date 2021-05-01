module.exports.setQuestions = (message, questions, services) => {
    const setQuestions = require("./setQuestions");
    setQuestions.run(message, questions, services);
}

module.exports.getQuestions = (authorId, services) => {
    const getQuestions = require("./getQuestions");
    return getQuestions.run(authorId, services);
}

module.exports.deleteQuestions = (authorId, services) => {
    const deleteQuestions = require("./deleteQuestions");
    return deleteQuestions.run(authorId, services);
}
