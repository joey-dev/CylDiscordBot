import { ILanguage } from '@cylbot/cyldiscordbotlanguage/index';
import { IFullPlugin, IFullPluginWithData } from './Plugin';

export interface IModule {
    id: number;
    name: keyof ILanguage;
}

export interface IFullModule extends IModule {
    plugins: IFullPlugin[];
}

export interface IFullModuleWithData extends IModule {
    plugins: IFullPluginWithData[];
}
