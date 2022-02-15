import { ILanguages } from '@cylbot/cyldiscordbotlanguage/index';
import { all } from 'redux-saga/effects';
import { IIconName } from '../../atomic/atoms/images/Icon';

export interface IDisplayLanguage {
    flag: IIconName;
    name: string;
    key: keyof ILanguages;
}

export function* watchServerSagas() {
    yield all([]);
}

export type websiteStoreState = {
    language: IDisplayLanguage
};
