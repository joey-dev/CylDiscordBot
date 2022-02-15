import { ILanguages } from '@cylbot/cyldiscordbotlanguage';

export interface ILanguageType {
    name: string,
    small_name: keyof ILanguages,
}
