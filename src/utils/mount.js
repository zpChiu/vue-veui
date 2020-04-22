import Vue from "vue";
import global from './global';
import scopedStyle from '@/utils/scopedStyle'
import router from "../router";
import store from '../store';

// import preview from './preview'
// 给定模板，和要挂载的元素id，挂载组件
var mount = function (id, _component) {
    let _vue = global.deepClone(_component.vue);
    
    if ( _vue.script && typeof _vue.script==='string' ) {
        _vue.script = eval('(' + _vue.script + ')');
    }

    return new Promise((resolve, reject) => {
        //需要延迟才能取到document.getElementById(id)
        setTimeout(() => {
    
            let VUELint = function (key,type) {
                let _default; 
                let script   = _vue.script || {};
                let toString = Object.prototype.toString;

                switch (type) {
                    case 'Object':
                        _default = {};
                        break;

                    case 'Function':
                        _default = ()=> {};
                        break;
                }

                if ( !script.hasOwnProperty(key) ) {
                    return _default;
                } else if ( toString.call(script[key]).slice(8,-1)===type ) {
                    if ( type==='Object' ) {
                        return script[key];
                    } else if ( type==='Function' ) {
                        return script[key].call(this);
                    }
                }
            };
            
            // 返回一个对象, 融合了组件暴露的属性和data数据,暴露的属性(attributes)优先于data, 且不一定存在于data
            let VUEdata = function (){
                let data = {};
                let attributes = {};

                if ( _vue.script.data ) {
                    data = _vue.script.data();
                }

                if ( _component.attributes ) {
                    Object.keys(_component.attributes).forEach(key => {
                        attributes[key] = _component.attributes[key].value;
                    });
                }
                
                return Object.assign(data, attributes);
            };
            
            // 混入（暂时未用到）
            let VUEmixin = {
                data () {
                    return {}
                },
                methods: {}
            };

            // 核心代码
            let vm = new Vue({
                router,
                store,
                name         : id.toString(),
                el           : document.getElementById(id),
                template     : _vue.template,
                data         : VUEdata.call(this),
                beforeCreate : VUELint.call(this,'beforeCreate','Function'),
                created      : VUELint.call(this,'created','Function'),
                beforeMount  : VUELint.call(this,'beforeMount','Function'),
                mounted () {
                    this.$el.id = id;
                    
                    scopedStyle(this.$el, _vue.css);

                    VUELint.call(this,'mounted','Function');
                },
                beforeUpdate : VUELint.call(this,'beforeUpdate','Function'),
                updated      : VUELint.call(this,'updated','Function'),
                beforeDestroy: VUELint.call(this,'beforeDestroy','Function'),
                destroyed    : VUELint.call(this,'destroyed','Function'),
                computed     : VUELint.call(this,'computed','Object'),
                watch        : VUELint.call(this,'watch','Object'),
                filters      : VUELint.call(this,'filters','Object'),
                methods      : VUELint.call(this,'methods','Object'),
                // mixins       : [VUEmixin]
            });

            resolve(vm); 
            
        }, 200);
    });
};

export default mount;
