import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000
});

instance.interceptors.request.use(config => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

    // 3.params/data序列化的操作
    
    const token =JSON.parse(window.localStorage.getItem('access-admin'))
		if (token) {
			config.headers.authorization = token
		}
    return config;
}, err => {
    console.log(err);
});

instance.interceptors.response.use(res => {
    console.log(res);
    if(res.data && res.data.statusCode){
        message.error(res.data.message)
    }
    return res.data;
}, err => {
    console.log('发生错误');
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                message.error("请求错误")
                console.log("请求错误");
                break;
            case 401:
                message.error("未授权访问")
                console.log("未授权访问");
                break;
            case 409:
                message.error("用户名已存在")
                console.log("用户名已存在");
                break;
            default:
                console.log("其他错误信息");
        }
    }
    return err;
});

export default instance;

