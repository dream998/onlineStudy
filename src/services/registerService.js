import request from "./axios";

export function register(params){
    return request.post('/users/register',params)
}