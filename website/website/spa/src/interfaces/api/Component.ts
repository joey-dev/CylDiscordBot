export type IComponentTypes =
    'command';

export interface IComponent {
    id: number,
    name: string,
    order_id: number;
    data: string;
    type: IComponentTypes;
}

export interface IFullComponent extends IComponent{ }

export interface IFullComponentWithData extends IFullComponent{
    turned_on: boolean;
    server_data: string;
}
