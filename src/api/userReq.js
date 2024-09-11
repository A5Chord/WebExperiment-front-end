import axios from 'axios';

const baseURL = 'http://localhost:8080/user'; // 用户相关接口的基础 URL

const userApi = axios.create({
    baseURL: baseURL,
    timeout: 5000 // 请求超时时间，单位毫秒
});

// 定义用户登录方法
userApi.login = function (userInfo) {
    return this.post('/login', userInfo);
};

userApi.register = function (userInfo) {
    return this.post('/register', userInfo);
}

userApi.changePwd = function (userInfo) {
    return this.put('/change-pwd', userInfo);
}

userApi.query = function (username) {
    return this.get(`/get-by-username?username=${username}`);
}

userApi.upload = function (image) {
    return this.post("/upload", image);
}

export default userApi;
