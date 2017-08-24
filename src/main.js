// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './tools/router'
import axios from './tools/axios';
import store from './tools/vuex'
import ElementUI from 'element-ui'
import './assets/css/element-theme/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery-slimscroll/jquery.slimscroll.min.js'
import './assets/js/pace.min.js'
import './assets/css/style.css'
import './directives/inspinia'
/*import '../static/layer/layer.js'*/
/*import Mock from './mock'*/
/*Mock.bootstrap();*/


Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;


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
