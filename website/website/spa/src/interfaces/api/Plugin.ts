import { IFullComponent, IFullComponentWithData } from './Component';

export interface IPlugin {
    id: number;
    name: string;
    order_id: number;
}

export interface IFullPlugin extends IPlugin{
    components: IFullComponent[];
}

export interface IFullPluginWithData extends IPlugin {
    components: IFullComponentWithData[]
    turned_on: boolean;
}
