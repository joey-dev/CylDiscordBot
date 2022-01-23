export interface ApiError {
    response: ErrorResponse;
}

export interface ErrorResponse {
    data: ErrorData;
}

export interface ErrorData {
    error: Error;
}
