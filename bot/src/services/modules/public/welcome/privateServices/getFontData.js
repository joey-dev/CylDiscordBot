module.exports.run = (fonts, text) => {
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
};

