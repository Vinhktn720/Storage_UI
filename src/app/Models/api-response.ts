export interface ApiResponse<T> {
    isSuccess : boolean;
    message : string;
    statusCode : number;
    response : T;
}
