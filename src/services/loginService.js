import request from './axios'

export function login(values){
    return request.post('/users/login',values)
}