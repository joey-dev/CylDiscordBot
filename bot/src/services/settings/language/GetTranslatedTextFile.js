const translations = require('@cylbot/cyldiscordbotlanguage');


const GetTranslatedTextFile = (language, defaultLanguage = false) => {
    const currentLanguage = language.small_name.replace('-', '');
    if (currentLanguage in translations && !defaultLanguage) {
        return translations[currentLanguage];
    }

    return translations['enUS'];
};

module.exports = GetTranslatedTextFile;
