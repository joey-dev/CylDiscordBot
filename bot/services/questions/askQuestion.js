class AskQuestion {
    askQuestion(client, message, question, authorId, answer) {
        message.reply(question);
        let questionIsAnswered = false;

        client.on('message', message => {
            if (message.author.bot || questionIsAnswered || message.author.id !== authorId) return;
            questionIsAnswered = true;
            answer(message);
        });
    }
}

export default AskQuestion;
