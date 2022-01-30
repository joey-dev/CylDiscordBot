export interface IApiError {
    response: IErrorResponse;
}

export interface IErrorResponse {
    data: IErrorData;
}

export interface IErrorData {
    error: Error;
}
