import { IFullPlugin, IFullPluginWithData } from './Plugin';

export interface IModule {
    id: number;
    name: string;
}

export interface IFullModule extends IModule {
    plugins: IFullPlugin[];
}

export interface IFullModuleWithData extends IModule {
    plugins: IFullPluginWithData[];
}
