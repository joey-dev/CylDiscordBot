// import {createCanvas, loadImage} from 'canvas';
import pkg from 'canvas';
// import { createCanvas } from 'canvas';
import Canvas from 'canvas';
import * as Discord from 'discord.js';
import { Data as WelcomeChannel } from '../../services/api/modules/welcome/data.js';

class Welcome {
    elements = [
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
            'text': 'Member: #{guildMemberCount}',
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
            'text': '{guildName}',
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
            this.sendWelcomeMessage(member, client);
        });

        client.on('message', async message => {
            if (message.content === '!sendWelcomeMessage')
                this.sendWelcomeMessage(message.member);
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

    sendWelcomeMessage(member) {
        if (!member.guild) return;

        this.getValues((values) => {
            this.generateAndSendImageWithText(values, member);
        }, member);
    }

    getCanvasImage() {
        const {loadImage} = Canvas;
        return loadImage(`./images/welcome/emptyWelcomeImage.png`);
    }

    getUserAvatar(member) {
        const {loadImage} = Canvas;
        return loadImage(member.user.displayAvatarURL({format: 'jpg'}));
    }

    getValues(callback, member) {
        Promise.all([
            this.getCanvasImage(),
            this.getUserAvatar(member),
        ]).then(values => {
            callback(values);
        });
    }

    generateAndSendImageWithText(values, member) {
        const {createCanvas} = Canvas;

        const canvas = createCanvas(1772, 633);
        let ctx = canvas.getContext('2d');
        const background = values[0];

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        this.elements.forEach(element => {
            if (element.type === 'text') {
                ctx = this.addTextElement(ctx, member, element);
            } else if (element.type === 'avatar') {
                ctx = this.addAvatarElement(ctx, element, values[1]);
            }
        });

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter('Welcome', member.guild.iconURL({dynamic: true}))
            .setDescription(`**Welcome to ${member.guild.name}!**
        Hi <@${member.id}>!, read and accept the rules!`)
            .setImage('attachment://welcome-image.png')
            .attachFiles(attachment);

        const channel = member.guild.channels.cache.find(channel => channel.id === '796010336821051402');
        channel.send(welcomeEmbed);
    }

    addTextElement(ctx, member, elementValues) {
        const text = this.getFormattedText(elementValues['text'], member);
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

    getFormattedText(text, member) {
        const variables = {
            'username': member.user.username,
            'discriminatorNumber': member.user.discriminator,
            'guildMemberCount': member.guild.memberCount,
            'guildName': member.guild.name,
        };

        for (const variableName in variables) {
            let splitText = text.split('{' + variableName + '}');
            if (splitText.length > 1) {
                text = splitText.join(variables[variableName]);
            }
        }

        return text;
    }

    getFontData(fonts, text) {
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

    addAvatarElement(ctx, element, avatar) {
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

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

export default Welcome;
