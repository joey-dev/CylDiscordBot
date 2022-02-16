const GetTranslatedTextFile = require('./GetTranslatedTextFile');


const GetTranslatedText = (language, name) => {
    const translatedTextFile = GetTranslatedTextFile(language);

    if (name in translatedTextFile) {
        return translatedTextFile[name];
    }

    const defaultTranslatedTextFile = GetTranslatedTextFile(language, true);
    return defaultTranslatedTextFile[name];
};

module.exports = GetTranslatedText;
