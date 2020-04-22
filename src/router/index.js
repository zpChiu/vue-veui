import Vue from "vue";
import Router from "vue-router";
const Home = r => require.ensure([], () => r(require("@/pages/Home")), "Home");

Vue.use(Router);

export default new Router({
    routes: [
        {   // 可视化页面浏览
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
});
