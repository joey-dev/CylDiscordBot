const fs = require('fs');


module.exports.run = (authorId, services) => {
    const questionsDatabaseJson = fs.readFileSync("tempDatabase/questions.json");
    const questionsDatabaseObject = JSON.parse(questionsDatabaseJson);

    if (authorId in questionsDatabaseObject) {
        return questionsDatabaseObject[authorId];
    }
    return null;
}
