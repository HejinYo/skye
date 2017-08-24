import Vue from 'vue'
import Router from 'vue-router'

/*引用页面模板- 供路由使用*/
/*import Hello from '@/components/Hello'
import dashboardv1 from '@/views/dashboardv1'
import dashboardv2 from '@/views/dashboardv2'
import Page4 from '@/views/Page4'
import login from '@/views/login'*/

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: resolve => require(['@/views/index'], resolve),
      meta: {requireAuth: true},
      children: [
        {
          path: '/hello',
          name: 'Hello',
          component: resolve => require(['@/components/Hello'], resolve),
          meta: {requireAuth: true}
        },
        {
          path: '/dashboardv1',
          name: 'dashboardv1',
          component: resolve => require(['@/views/dashboardv1'], resolve),
          meta: {requireAuth: true}
        },
        {
          path: '/dashboardv2',
          name: 'dashboardv2',
          component: resolve => require(['@/views/dashboardv2'], resolve),
          meta: {requireAuth: true}
        },
        {
          path: '/Page4',
          name: 'Page4',
          component: resolve => require(['@/views/Page4'], resolve),
          meta: {requireAuth: true}
        },
        {
          path: '/user',
          name: 'user',
          component: resolve => require(['@/views/user'], resolve),
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:
        resolve => require(['@/views/login'], resolve)
    }
    ,
    {
      path: '/login_el',
      name: 'login_el',
      component:
        resolve => require(['@/views/login_el'], resolve)
    }
    ,
    {
      path: '/404',
      name: '',
      component:
        resolve => require(['@/views/common/page404'], resolve)
    }
    ,
    {
      path: '*',
      redirect: {path: '/404'}
    }
  ]
});

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let userToken = sessionStorage.getItem('userToken');
  //判断要去的路由有没有requiresAuth
  if (to.meta.requireAuth) {
    if (userToken) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();//如果无需token,那么随它去吧
  }
});

export default router;
