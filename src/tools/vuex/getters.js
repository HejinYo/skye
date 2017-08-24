import router from '../router'


//相当于计算属性，可以自定义state所相关的属性，比如取反
export const count = state => {
  return state.count
}

//获得当前登录用户信息，如果vuex中没有，则去sesionStorage中获取，都没有则需要登录
export const loginUser = state => {
  let loginUser = JSON.parse(sessionStorage.getItem('loginUser'));
  if (state.loginUser) {
    return state.loginUser
  } else if (loginUser) {
    return loginUser;
  } else {
    router.push({path: '/login'});
  }
}
