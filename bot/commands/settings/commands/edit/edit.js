import Disable from '../../../../services/api/commands/disable.js';
import Enable from '../../../../services/api/commands/enable.js';
import Questions from '../../../../services/questions/questions.js';

class Edit {
    static command(message, args, client) {
        let commandName = args[2];

        let questionsArray = [
            { // 0
                'question': 'What do you want to change for the `' + commandName + '` command?\n- status \n- roles \n- nothing',
                'nextQuestion': {
                    'status': 1,
                    'roles': 5,
                    '_default': 11,
                },
            },
            { // 1
                'question': 'Do you want to change this command to enabled or disabled?',
                'nextQuestion': {
                    'enabled': 2,
                    'disabled': 3,
                    '_default': 4,
                },
            },
            { // 2
                'ending': 'You successfully enabled this command!',
            },
            { // 3
                'ending': 'You successfully disabled this command!',
            },
            { // 4
                'ending': 'You did not choose enabled or disabled. If you still want to change the status, please type in the edit command again.',
            },
            { // 5
                'question': 'What do you want to do with the roles for the command: `' + commandName + '`?\n- add \n- remove \n- nothing',
                'nextQuestion': {
                    'add': 6,
                    'remove': 8,
                    '_default': 10,
                },
            },
            { // 6
                'question': 'What is the name of the role you want to add? (this must already be a discord role)',
                'nextQuestion': {
                    '_default': 7,
                },
            },
            { // 7
                'ending': true,
            },
            { // 8
                'question': 'What is the name of the role you want to remove?',
                'nextQuestion': {
                    '_default': 9,
                },
            },
            { // 9
                'ending': true,
            },
            { // 10
                'ending': 'You did not choose add or remove. If you still want to edit the role(s), please type in the edit command again.',
            },
            { // 11
                'ending': 'You did not choose status or roles. If you still want to edit this command, please type in the edit command again.',
            },
        ];

        let questions = new Questions();
        questions.askQuestions(client, message, questionsArray, message.author.id, (answers) => {
            switch (answers[0]) {
                case 'status':
                    this.status(answers, commandName, message);
            }
            console.log(answers);
        });
    }

    static status(answers, commandName, message) {
        let filteredAnswers = answers.filter(function (el) {
            return el != null;
        });

        if (answers[1] === 'disabled') {
            Disable.command(commandName, message.guild.id, () => {
            });
        } else if (answers[1] === 'enabled') {
            Enable.command(commandName, message.guild.id, () => {
            });
        }
    }
}

export default Edit;
