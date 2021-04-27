const fs = require('fs');


module.exports.run = (message, questions) => {
    const questionsDatabaseJson = fs.readFileSync("tempDatabase/questions.json");

    const questionsDatabaseObject =JSON.parse(questionsDatabaseJson);
    questionsDatabaseObject[message.id] = questions;

    const newQuestionsDatabaseJson = JSON.stringify(questionsDatabaseObject, null, 4);
    fs.writeFileSync("tempDatabase/questions.json", newQuestionsDatabaseJson, 'utf8');
}
