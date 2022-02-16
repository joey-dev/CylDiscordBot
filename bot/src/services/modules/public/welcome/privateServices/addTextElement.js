const getFontData = require('./getFontData');
const getTextWithVariablesAdded = require('./getTextWithVariablesAdded');


module.exports.run = (ctx, member, guild, elementValues) => {
    const text = getTextWithVariablesAdded.run(elementValues['text'], member, guild);
    let font = getFontData.run(elementValues['font'], text);

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
};

