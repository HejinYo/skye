/*import Vue from 'vue'*/
import Router from 'vue-router'

Vue.use(Router);

/*引用页面模板- 供路由使用*/
/*import Hello from '@/components/Hello'
import dashboardv1 from '@/views/dashboardv1'
import dashboardv2 from '@/views/dashboardv2'
import Page4 from '@/views/Page4'
import login from '@/views/login'*/
const manage = resolve => require(['@/views/index'], resolve);
const login = resolve => require(['@/views/login'], resolve);
const page_404 = resolve => require(['@/views/common/page404'], resolve);
const landing = resolve => require(['@/views/landing'], resolve);

let router = new Router({
    routes: [
      {
        path: '/',
        name: '展示页面',
        component: landing
      },
      {
        path: '/login',
        name: '登录',
        component: login
      }
      ,
      {
        path: '/404',
        name: '无此页面',
        component: page_404
      }
      ,
      {
        path: '/manage',
        name: '首页',
        component: manage,
        meta: {requireAuth: true},
        redirect: '/manage/main',
        children: [
          {
            path: 'main',
            name: '动态',
            component: resolve => require(['@/views/main'], resolve),
            meta: {requireAuth: true}
          },
          {
            path: 'profile',
            name: '用户资料',
            component: resolve => require(['@/views/profile'], resolve),
            meta: {requireAuth: true}
          },
          {
            path: '/hello',
            name: 'Hello',
            component: resolve => require(['@/components/Hello'], resolve),
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
            name: '用户管理',
            component: resolve => require(['@/views/system/user'], resolve),
            meta: {requireAuth: true}
          },
          {
            path: '/resource',
            name: '资源管理',
            component: resolve => require(['@/views/system/resource.vue'], resolve),
            meta: {requireAuth: true}
          },
          {
            path: '/role',
            name: '角色管理',
            component: resolve => require(['@/views/system/role.vue'], resolve),
            meta: {requireAuth: true}
          },
          {
            path: '/test',
            name: '测试',
            component: resolve => require(['@/views/test.vue'], resolve),
            meta: {requireAuth: true}
          }
        ]
      },
      {
        path: '/manage',
        name: 'jqGrid',
        component:
        manage,
        meta:
          {
            requireAuth: true
          }
        ,
        redirect: '/manage/main',
        children:
          [
            {
              path: '/dashboardv1',
              name: 'dashboardv1',
              component: resolve => require(['@/views/dashboardv1'], resolve),
              meta: {requireAuth: true}
            },
          ]
      }
      ,
      {
        path: '*',
        redirect:
          {
            path: '/404'
          }
      }
    ]
  })
;

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
