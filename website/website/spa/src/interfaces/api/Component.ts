
export interface IComponent {
    id: number,
    name: string,
    order_id: number;
    data: string;
    type: string;
}

export interface IFullComponent extends IComponent{ }
