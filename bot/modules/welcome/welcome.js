import Canvas from 'canvas';
import * as Discord from 'discord.js';

class Welcome {
    static messageData = {
        "color": "RANDOM",
        "descriptions": [
            "Welcome {yellUser} to {serverName}!",
            "Hey {yellUser}, Welcome to {serverName}!",
        ],
        "footer": "Welcome",
        "withCustomPicture": true,
        "timestamp": true,
        "enabled": true,
        "roles": [
            '796025329696899072',
        ]
    };

    static elements = [
        {
            'type': 'text',
            'text': '{username}',
            'font': {
                '>13': {
                    'bold': true,
                    'italic': false,
                    'size': '90px',
                    'family': 'Genta',
                    'style': '#f2f2f2',
                    'position': {
                        'x': '720',
                        'y': '336',
                    },
                },
                '<14': {
                    'bold': true,
                    'italic': false,
                    'size': '150px',
                    'family': 'Genta',
                    'style': '#f2f2f2',
                    'position': {
                        'x': '720',
                        'y': '336',
                    },
                },
            },
        },
        {
            'type': 'text',
            'text': '#{discriminatorNumber}',
            'font': {
                '>0': {
                    'bold': true,
                    'italic': false,
                    'size': '40px',
                    'family': 'Genta',
                    'style': '#f2f2f2',
                    'position': {
                        'x': '730',
                        'y': '374',
                    },
                },
            },
        },
        {
            'type': 'text',
            'text': 'Member: #{serverMemberCount}',
            'font': {
                '>0': {
                    'bold': true,
                    'italic': false,
                    'size': '60px',
                    'family': 'Genta',
                    'style': '#f2f2f2',
                    'position': {
                        'x': '750',
                        'y': '441',
                    },
                },
            },
        },
        {
            'type': 'text',
            'text': '{serverName}',
            'font': {
                '>0': {
                    'bold': true,
                    'italic': false,
                    'size': '60px',
                    'family': 'Genta',
                    'style': '#f2f2f2',
                    'position': {
                        'x': '700',
                        'y': '166',
                    },
                },
            },
        },
        {
            'type': 'avatar',
            'position': {
                'x': 316,
                'y': 316,
            },
            'radius': 250
        },
    ];

    constructor(client) {
        client.on('guildMemberAdd', member => {
            Welcome.sendWelcomeMessage(member, client);
        });

        client.on('message', async message => {
            if (message.content === '!sendWelcomeMessage')
                Welcome.sendWelcomeMessage(message.member);
        });
    }

    // sendWelcomeMessage(member, client) {
    //     WelcomeChannel.getWelcomeData(member.guild.id, (response) => {
    //         const welcomeChannel = client.channels.cache.get(response.channelId);
    //         const totalWelcomeMessages = response.messages.length;
    //         const welcomeMessageUsingIndex = this.getRandomInt(totalWelcomeMessages);
    //
    //         const welcomeMessage = response.messages[welcomeMessageUsingIndex].replace("//name//", member);
    //
    //         for (let roleIndex = 0; roleIndex < response.roles.length; roleIndex++) {
    //             member.guild.roles.fetch(response.roles[roleIndex])
    //                 .then(role => {
    //                     member.roles.add(role);
    //                 });
    //         }
    //
    //         welcomeChannel.send(welcomeMessage);
    //     });
    // }

    static sendWelcomeMessage(member) {
        if (!member.guild) return;

        this.getValues((values) => {
            this.generateAndSendImageWithText(values, member);
        }, member);
    }

    static getCanvasImage() {
        const {loadImage} = Canvas;
        return loadImage(`./images/welcome/emptyWelcomeImage.png`);
    }

    static getUserAvatar(member) {
        const {loadImage} = Canvas;
        return loadImage(member.user.displayAvatarURL({format: 'jpg'}));
    }

    static getValues(callback, member) {
        Promise.all([
            this.getCanvasImage(),
            this.getUserAvatar(member),
        ]).then(values => {
            values[2] = Welcome.messageData;
            values[3] = Welcome.elements;
            callback(values);
        });
    }

    static generateAndSendImageWithText(values, member) {
        const messageData = values[2];
        const elements = values[3];

        if (!messageData.withCustomPicture) {
            const descriptionIndex = this.getRandomInt(messageData.descriptions);

            const welcomeEmbed = this.createEmbedMessage(messageData.color, messageData.timestamp, messageData.footer, messageData.descriptions[descriptionIndex]);

            const channel = member.guild.channels.cache.find(channel => channel.id === '796010336821051402');
            channel.send(welcomeEmbed);

            return;
        }
        const {createCanvas} = Canvas;

        const canvas = createCanvas(1772, 633);
        let ctx = canvas.getContext('2d');
        const background = values[0];

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        elements.forEach(element => {
            if (element.type === 'text') {
                ctx = this.addTextElement(ctx, member, element);
            } else if (element.type === 'avatar') {
                ctx = this.addAvatarElement(ctx, element, values[1]);
            }
        });

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        const descriptionIndex = this.getRandomInt(messageData.descriptions.length);
        const description = this.getTextWithVariablesAdded(messageData.descriptions[descriptionIndex], member);

        const welcomeEmbed = this.createEmbedMessage(messageData.color, messageData.timestamp, messageData.footer, description, attachment);

        const channel = member.guild.channels.cache.find(channel => channel.id === '796010336821051402');
        channel.send(welcomeEmbed);

        this.giveRolesToUser(member, messageData.roles);
    }

    static addTextElement(ctx, member, elementValues) {
        const text = this.getTextWithVariablesAdded(elementValues['text'], member);
        let font = this.getFontData(elementValues['font'], text);

        if (Object.entries(font).length === 0) {
            return false;
        }

        let textAccent = '';
        if (font.bold) {
            textAccent += 'bold ';
        }

        if (font.italic) {
            textAccent += 'italic ';
        }

        ctx.font = textAccent + font.size + ' ' + font.family;
        ctx.fillStyle = font.style;
        ctx.fillText(text, font.position.x, font.position.y);

        return ctx;
    }

    static getTextWithVariablesAdded(text, member) {
        const variables = {
            'username': member.user.username,
            'discriminatorNumber': member.user.discriminator,
            'serverMemberCount': member.guild.memberCount,
            'serverName': member.guild.name,
            'yellUser': member.user,
        };

        for (const variableName in variables) {
            let splitText = text.split('{' + variableName + '}');
            if (splitText.length > 1) {
                text = splitText.join(variables[variableName]);
            }
        }

        return text;
    }

    static getFontData(fonts, text) {
        const fontKeys = Object.keys(fonts);
        let font = {};

        fontKeys.forEach(key => {
            let indicator = key.slice(0, 1);
            let lengthOfTextInKey = parseInt(key.slice(1, 3));

            if (indicator === '>') {
                if (text.length > lengthOfTextInKey) {
                    font = fonts[key];
                }
            } else if (indicator === '<') {
                if (text.length < lengthOfTextInKey) {
                    font = fonts[key];
                }
            } else if (indicator === '=') {
                if (text.length === lengthOfTextInKey) {
                    font = fonts[key];
                }
            }
        });

        return font;
    }

    static addAvatarElement(ctx, element, avatar) {
        let x = element.position.x;
        let y = element.position.y;
        let radius = element.radius;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, x - radius, y - radius, radius * 2, radius * 2);

        return ctx;
    }

    static createEmbedMessage(color, timeStamp, footer, description, attachment = false) {
        let embedMessage = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(description)
            .setImage('attachment://welcome-image.png')

        if (attachment) {
            embedMessage.attachFiles(attachment);
        }

        if (timeStamp) {
            embedMessage.setTimestamp();
        }

        if (footer) {
            embedMessage.setFooter(footer);
        }

        return embedMessage;
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static giveRolesToUser(member, roles) {
        for (let roleIndex = 0; roleIndex < roles.length; roleIndex++) {
            member.guild.roles.fetch(roles[roleIndex])
                .then(role => {
                    member.roles.add(role);
                });
        }
    }
}

export default Welcome;
