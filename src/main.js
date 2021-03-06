// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './tools/router'
import axios from './tools/axios';
import store from './tools/vuex'
import './assets/css/element-theme/index.css'
/*import 'iview/dist/styles/iview.css';*/
import './assets/css/iview-theme/index.less';
import {Table, TableColumn, Loading, Tree} from 'element-ui';
/*import './assets/css/style.css'*/
import './directives/inspinia'
/*import iView from 'iview';*/
/*import ElementUI from 'element-ui'*/
/*import 'bootstrap/dist/css/bootstrap.min.css'*/
/*import 'font-awesome/css/font-awesome.min.css'*/
/*import 'bootstrap/dist/js/bootstrap.min.js'*/
/*import 'jquery-slimscroll/jquery.slimscroll.min.js'*/
/*import './assets/js/pace.min.js'*/
/*import '../static/layer/layer.js'*/
/*import Mock from './mock'*/
/*Mock.bootstrap();*/
/*Vue.use(ElementUI);*/
/*Vue.use(iView);*/
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tree)
Vue.use(Loading.directive)
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/*Vue.use(VeeValidate);*/

/*Validator.updateDictionary({
  zh_CN: {
    messages
  }
});*/
/*
const config = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_CN',
  messages: null,
  strict: true
};
Vue.use(VeeValidate, config);
*/


/*layer.config({
  path: 'static/layer/' //layer.js所在的目录，可以是绝对目录，也可以是相对目录
});
//重写alert
window.alert = function (msg, callback) {
  parent.layer.alert(msg, {
    title: '温馨提示',
    skin: 'layui-layer-molv',
    closeBtn: 0,
    anim: 6
  }, function (index) {
    parent.layer.close(index);
    if (typeof(callback) === "function") {
      callback("ok");
    }
  })
};
*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
