const fs = require('fs');


module.exports.run = (message, services) => {
    const questionsDatabaseJson = fs.readFileSync("tempDatabase/questions.json");
    const questionsDatabaseObject = JSON.parse(questionsDatabaseJson);

    delete questionsDatabaseObject[message.author.id];

    const newQuestionsDatabaseJson = JSON.stringify(questionsDatabaseObject);
    fs.writeFileSync("tempDatabase/questions.json", newQuestionsDatabaseJson);
}
