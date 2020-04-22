# vue-visualui

> VisualEditor UI for vue

### CSDN文章
[基于Vue搭建的可视化页面编辑平台（打造大中台、小前台的基础建设）](https://blog.csdn.net/PikaChiu/article/details/105677835)

### 界面示意图
![界面示意图](/src/assets/images/veui-design.png)

### 返回的数据格式如下：
```
{
    log: null,
    result: true,
    result_object: {
        zt: 1,
        msg: "",
        dt: {
            // 所有页面上的组件
            components: [
                {
                    // 组件信息
                    info: {
                        id: "",
                        name: "header",
                        tips: '头部组件之类1'
                    },
                    // 组件配置属性（暴露）
                    attributes: {
                        title: {
                            name: "名称",
                            type: "text",
                            value: "后台综合管理系统",
                            tips: "",
                            placeholder: "请输入名称"
                        },
                    },
                    vue: {
                        template: "<div>vue模板</div>",
                        // vue的script
                        script:`{
                            data () {
                                return {
                                    
                                };
                            },
                            computed () {

                            },
                            methods:{

                            },
                            beforeCreate () {

                            }
                        }`,
                        css:"组件的scoped Css"
                    }
                },
            ],
            // 预览页面的css
            // 页面预览的css > 组件的css
            css:'',
        }
    }
};
```

## Build Setup

``` bash
# install dependencies
npm install

# install babel-polyfill
npm install --save babel-polyfill

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
