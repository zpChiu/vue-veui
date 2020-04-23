export default {
    // 深拷贝复制对象
    deepClone (source) {
        const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
        for(let keys in source){ // 遍历目标
            if(source.hasOwnProperty(keys)){
                if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
                    targetObj[keys] = source[keys].constructor === Array ? [] : {};
                    targetObj[keys] = this.deepClone(source[keys]);
                }else{ // 如果不是，就直接赋值
                    targetObj[keys] = source[keys];
                }
            }
        }
        return targetObj;
    },
    // 获取随机ID，组件拖到预览视图后就会被设置个ID
    guid () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4();
    },
    typeof (target) {
        return Object.prototype.toString.call(target).slice(8,-1);
    },
    eval (code) {
        return new Function('return ' + code)();
    }
}
