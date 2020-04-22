import Vue from "vue";
import App from "./App";
import router from "./router";
import mock from './mock';
import store from './store';
import ViewUI from 'view-design';

Vue.config.productionTip = false;
Vue.use(ViewUI);

// 全局样式
import 'view-design/dist/styles/iview.css';

// 全局脚本
import global from './utils/global.js'
import ajax from './utils/ajax.js'

Vue.prototype.$global = global;
Vue.prototype.$ajax   = ajax;

window._Vue = new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
