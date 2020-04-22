import Vue from "vue";
import Vuex from "vuex";

//挂载Vuex
Vue.use(Vuex);

//创建VueX对象
const store = new Vuex.Store({
    state: {
        // 组件仓库
        componentStore: [],
        // 预览区组件
        previewComponents: [],
        // 当前组件（作用于属性面板、删除）
        currentComponent: null,
        // 页面的scopedCSS
        css: '',
    },
    mutations:{
        setState (state,obj) {
            const key  = obj.key;
            const data = obj.data;
            
            state[key] = data;
        },
        addPreviewComponents (state,dragingComponent) {
            state.previewComponents.push(dragingComponent);
        },
    }
});

export default store;
