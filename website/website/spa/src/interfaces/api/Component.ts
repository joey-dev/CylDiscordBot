
export interface IComponent {
    id: number,
    name: string,
    order_id: number;
    data: string;
    type: string;
}

export interface IFullComponent extends IComponent{ }

export interface IFullComponentWithData extends IFullComponent{
    turned_on: boolean;
    server_data: string;
}
