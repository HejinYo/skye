import axios from 'axios';
import router from '../router'
import {Message} from 'element-ui';
import {Notification} from 'element-ui';

//https://www.kancloud.cn/yunye/axios/234845 详细配置
axios.interceptors.request.use(
  config => {
    let userToken = sessionStorage.getItem('userToken');
    if (userToken !== null) {
      config.headers['Authorization'] = userToken
    }
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000,
      }
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  let code = response.data.code;
  if (1130 === code || 1002 === code || 1131 === code) {
    Notification.info({
      message: response.data.message
    });
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
  }
  return response
}, error => {
  if (error.response) {
    let message = error.response.data.message;
    switch (error.response.status) {
      case 401:
        Message.warning({message: message});
        break;
      case 500:
        Message.warning({message: message});
        break;
      case 504:
        Message.warning({message: "网络连接超时"});
        break;
      default:
        Message.warning({message: "服务器繁忙，请稍候再试"});
    }
  }
  return Promise.reject(error)
});

export default axios;
