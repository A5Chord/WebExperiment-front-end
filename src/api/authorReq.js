import axios from 'axios';

const baseURL = 'http://localhost:8080/author'; // 用户相关接口的基础 URL

const userCommonApi = axios.create({
    baseURL: baseURL,
    timeout: 5000 // 请求超时时间，单位毫秒
});

// 定义用户登录方法
userCommonApi.page = function() {
    return this.get('/page');
};

userCommonApi.deleteById = function(id) {
    return this.delete(`/${id}`);
};

userCommonApi.addAuthor = function(authorInfo) {
    return this.post('', authorInfo);
};

userCommonApi.updateAuthor = function(authorInfo) {
    return this.put('', authorInfo);
};

export default userCommonApi;
