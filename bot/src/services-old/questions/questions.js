import AskQuestion from './askQuestion.js';

class Questions {
    questions = [
        {
            "question": "when answering yes to this question you go to the next question, if you ask anything else you go to question on index 2.",
            "nextQuestion": {
                "yes": 1,
                "_default": 2
            }
        },
        {
            "question": "It does not matter what you answer in this question, you go to question on index 2",
            "nextQuestion": {
                "_default": 2
            }
        },
        {
            "ending": "This was the last question :)"
        }
    ];

    askQuestions(client, message, questions, userId, callback, answers = [], questionIndex = 0) {
        let question = questions[questionIndex];

        if (question.ending) {
            if (question.ending === true) {
                callback(answers);
            } else {
                message.reply(question.ending);
                callback(answers);
            }
        } else {
            let askQuestion = new AskQuestion();

            askQuestion.askQuestion(client, message, question.question, message.author.id, (answer) => {
                answers[questionIndex] = answer.content;

                if (question.nextQuestion && question.nextQuestion[answer]) {
                    questionIndex = question.nextQuestion[answer];
                    this.askQuestions(client, message, questions, userId, callback, answers, questionIndex);
                } else if (question.nextQuestion) {
                    questionIndex = question.nextQuestion['_default'];
                    this.askQuestions(client, message, questions, userId, callback, answers, questionIndex);
                }
            });
        }
    }
}

export default Questions;
