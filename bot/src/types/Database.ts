export interface IWhereItem {
    key: string;
    value: string|number;
}

export interface DatabaseReturnValue<Database> {
    results: Database[];
}

export interface ILanguage {
    id?: number;
    name: string,
    small_name: string;
}

export interface IServer {
    id?: number;
    language_id?: number;
    server_id?: string;
    name?: string;
    command_prefix?: string;
}

export interface IDatabaseDeleteSuccess {
    success: boolean;
}
