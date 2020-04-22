// 引入mockjs
const Mock = require("mockjs");

// 获取 mock.Random 对象
const Random = Mock.Random;

let dt_componentStore = [
    {
        // 组件信息
        info: {
            id: "",
            name: "header",
            tips: '头部组件之类1'
        },
        // 组件配置属性
        attributes: {
            title: {
                name: "名称",
                type: "text",
                value: "后台综合管理系统",
                tips: "",
                placeholder: "请输入名称"
            },
            color: {
                name: "字体颜色",
                type: "text",
                value: "#555",
                tips: "",
                placeholder: "请输入正确的字体颜色"
            },
            backgroundColor: {
                name: "背景颜色",
                type: "text",
                value: "#f3bf88",
                tips: "",
                placeholder: "请输入正确的背景颜色"
            },
            width: {
                name: "宽度",
                type: "text",
                value: "",
                tips: "",
                placeholder: "请输入正确的宽度（带单位）"
            },
            height: {
                name: "高度",
                type: "text",
                value: "60px",
                tips: "",
                placeholder: "请输入正确的高度（带单位）"
            },
        },
        vue: {
            // vue模板
            template: `<div class="header" :style="{ width:width,height:height,backgroundColor:backgroundColor}">
                            <div class="header-title"
                                :style="{ color:color}"
                                v-if=" title && title!=='' "
                            >{{ title }}</div>
                      </div>`,
            // vue的script
            script:`{
                        data () {
                            return {
                                title: "",
                                width: '',
                                height: "",
                                color: "",
                                backgroundColor: "",
                            };
                        },
                    }`,
            css:`
                .header-title{
                    display: inline-block;
                    padding: 0 10px;
                    font-size: 17px;
                    line-height: 60px;
                }
            `
        }
    },
    {
        // 组件信息
        info: {
            id: "",
            name: "content",
            tips: '内容'
        },
        // 组件配置属性
        attributes: {
            content: {
                name: "内容",
                type: "text",
                value: "请输入内容",
                tips: "",
                placeholder: "请输入内容"
            },
            width: {
                name: "宽度",
                type: "text",
                value: "100%",
                tips: "",
                placeholder: "请输入正确的宽度（带单位）"
            },
            height: {
                name: "高度",
                type: "text",
                value: "100px",
                tips: "",
                placeholder: "请输入正确的高度（带单位）"
            },
        },
        vue: {
            // vue模板
            template: `<div class="main-content" :style="{ width:width,height:height}">
                            <div class="content"
                                v-if=" content && content!=='' "
                            >{{ content }}</div>
                      </div>`,
            // vue的script
            script:`{
                        data () {
                            return {
                                content: "",
                                width: '',
                                height: "",
                            };
                        },
                    }`,
            css:`
                .main-content{
                    background-color: #f7f7f7;
                }
            `
        }
    },
]

dt_componentStore.forEach((item,index)=>{
    item.info.id = 'component' + index;
});

export const componentStore = {
    log: null,
    result: true,
    result_object: {
        zt: 1,
        msg: "",
        dt: {
            components: dt_componentStore
        }
    }
};
