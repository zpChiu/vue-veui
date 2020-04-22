// 引入mockjs
const Mock = require("mockjs");

// 获取 mock.Random 对象
const Random = Mock.Random;

let dt_previewPage = [
    {
        // 组件信息
        info: {
            id: "c396746f-90c0",
            name: "header_1"
        },
        // 组件配置属性
        attributes: {
            text: {
                name: "文本信息",
                type: "text",
                value: "这是一个头部",
                tips: "温馨提示",
                placeholder: "请输入文本信息"
            },
            color: {
                name: "字体颜色",
                type: "text",
                value: "red",
                tips: "",
                placeholder: "请输入正确的字体颜色"
            },
        },
        vue: {
            // vue模板
            template: `<div>
                                <Tabs value="name1">
                                    <TabPane label="标签一" name="name1">
                                        <p :style="{ color: color }">{{ text }}</p>
                                    </TabPane>
                                    <TabPane label="标签二" name="name2">{{ textstr }}</TabPane>
                                    <TabPane label="标签三" name="name3">{{ text|filtersStr }}</TabPane>
                                    <TabPane label="标签四" name="name4">{{ dataText }}</TabPane>
                                </Tabs>
                            </div>`,
            // vue的script
            script: `{
                            data () {
                                return {
                                    dataText: "dataText"
                                };
                            },
                            watch: {
                                text (newVal, oldVal) { }
                            },
                            computed: {
                                textstr () {
                                    return "textstr" + this.text;
                                }
                            },
                            filters: {
                                filtersStr (val) {
                                    return "filters--" + val;
                                }
                            },
                            created () { },
                            mounted () {
                                this.changeText();
                            },
                            methods: {
                                changeText () {
                                    // setTimeout(() => {
                                    //     this.text += '一秒后修改';
                                    // }, 1000);
                                }
                            }
                        }`
        }
    },
    {
        // 组件信息
        info: {
            id: "123123213213",
            name: "头部组件2",
            tips: "这是头部组件2"
        },
        // 组件配置属性
        attributes: {
            title: {
                name: "标题",
                type: "text",
                value: "头部标题2",
                tips: "",
                placeholder: "请输入头部标题"
            },
            color: {
                name: "标题颜色",
                type: "text",
                value: "green",
                tips: "",
                placeholder: "请输入正确的字体颜色"
            },
        },
        vue: {
            // vue模板
            template: `<div class="header2">
                        <div :style="{ height:headerHeight,backgroundColor:backgroundColor }">
                            <div class="header-box"
                                :style="{ padding:'0 5px',display:'inline-block',color:color,fontSize: '20px',lineHeight: '60px' }"
                            >{{ title }}</div>
                        </div>
                        </div>`,
            // vue的script
            script: `{
                            data () {
                                return {
                                    title: "默认标题",
                                    height: "60",
                                    color: "orange",
                                    backgroundColor: "rgb(241, 247, 196)",
                                };
                            },
                            computed: {
                                headerHeight () {
                                    return this.height + 'px';
                                }
                            },
                        }`,
            css:`.header-box {font-weight: 550;}`
        }
    }
];

export const previewPage = {
    log: null,
    result: true,
    result_object: {
        zt: 1,
        msg: "",
        dt: {
            // components: dt_previewPage,
            components: [],
            css:'',
        }
    }
};
