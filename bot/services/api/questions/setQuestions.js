const fs = require('fs');


module.exports.run = (message, questions, services) => {
    const questionsDatabaseJson = fs.readFileSync("tempDatabase/questions.json");
    const questionsDatabaseObject = JSON.parse(questionsDatabaseJson);

    questionsDatabaseObject[message.author.id] = questions;

    const newQuestionsDatabaseJson = JSON.stringify(questionsDatabaseObject);
    fs.writeFileSync("tempDatabase/questions.json", newQuestionsDatabaseJson);
}
