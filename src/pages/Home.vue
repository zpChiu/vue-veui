<template>
    <div class="main">
        <div class="header">
            <div class="head-title">Vue-VisualEditorUI（VEUI）</div>
            <div class="test-btn">
                <Button type="primary" @click="strogeComponents">保存</Button>
            </div>
        </div>
        <div class="contain" v-if="isInit">
            <!-- 组件面板 -->
            <div class="panel-component">
                <ComponentStore></ComponentStore>
            </div>

            <!-- 页面预览面板 -->
            <div class="panel-page">
                <div class="panel-head">
                    <div class="panel-page-title">{{ todo }}</div>
                    <div class="page-tools">
                        <ul>
                            <li
                                v-for="(tool,index) in tools"
                                :class="[tool.class,{'tool-active':tool.name===todo}]"
                                @click="todo=tool.name"
                            ></li>
                        </ul>
                    </div>
                </div>
                <PreviewPage ref="preview" :class="['page-preview',{'preview-translate':todo=='编辑样式'}]"></PreviewPage>
                <MonacoEditor
                    :class="['page-cssEditor',{'cssEditor-translate':todo=='编辑样式'}]"
                    :language="language"
                    :codes="previewCSS"
                    @onMounted="onMountedCSS"
                    @onCodeChange="onCodeChangeCSS"
                ></MonacoEditor>
            </div>

            <!-- 属性面板 -->
            <div class="panel-attributes">
                <div class="panel-sub">属性面板</div>
                <div class="config-attributes" v-if=" this.currentComponent ">
                    <SubAttribute
                        :attributes="currentComponent.attributes"
                        @update="updateAttribute"
                    ></SubAttribute>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mount from '@/utils/mount'
import scopedStyle from '@/utils/scopedStyle'
import ComponentStore from '@/components/ComponentStore'
import PreviewPage from '@/components/PreviewPage'
import SubAttribute from '@/components/SubAttribute'
import MonacoEditor from '@/components/MonacoEditor'
export default {
    name: 'Home',
    data () {
        return {
            isInit: false,
            // 预览视图的工具栏
            tools: [
                {
                    name: '页面预览',
                    class: 'tool-preview'
                },
                {
                    name: '编辑样式',
                    class: 'tool-css'
                }
            ],
            todo: '页面预览',
            // 编辑器插件语言
            language: 'css',
            // 编辑器初始化代码
            codes: `/* 请写入CSS代码 */`
        }
    },
    computed: {
        // 组件仓库源码
        componentStoreScoure: {
            get (value) {
                return this.$store.state.componentStore || [];
            }
        },
        // 当前组件（作用于属性面板、删除）
        currentComponent: {
            get (value) {
                return this.$store.state.currentComponent;
            }
        },
        // 预览区组件
        previewComponents: {
            get (value) {
                return this.$store.state.previewComponents;
            }
        },
        // 预览页面的CSS
        previewCSS: {
            get (value) {
                if (this.$store.state.css === '') {
                    return this.codes;
                }
                return this.$store.state.css;
            }
        },
    },
    components: {
        ComponentStore,
        PreviewPage,
        SubAttribute,
        MonacoEditor
    },
    created () {
    },
    mounted () {
        this.$Spin.show();
        this.$ajax.all([
            this.getComponentStore(),
            this.getPreviewPage(),
        ]).then(this.$ajax.spread(() => {
            this.isInit = true;
            this.$nextTick(()=>{
                scopedStyle(this.$refs.preview.$el, this.previewCSS, 'custom-layout');
            });
            this.$Spin.hide();
        }));
    },
    methods: {
        // 当前组件属性更新
        updateAttribute (attr) {

            Object.assign(this.currentComponent.attributes, attr);

            mount(this.currentComponent.info.id, this.currentComponent);
        },
        // 获取组件仓库
        getComponentStore () {
            return this.$ajax.post('/get/componentStore', {
                jsondt: {}
            }).then((data) => {
                if (data.zt == '1') {
                    this.$store.commit('setState', {
                        key: 'componentStore',
                        data: data.dt.components
                    });
                }
            });
        },
        // 获取可视化页面数据
        getPreviewPage () {
            return this.$ajax.post('/get/previewPage', {
                jsondt: {}
            }).then((data) => {
                if (data.zt == '1') {
                    let preview = window.localStorage.getItem('preview');
                    preview = preview ? JSON.parse(preview) : data.dt;

                    // 拿到数据后, 把预览组件和CSS放在Vuex进行管理
                    this.$store.commit('setState', {
                        key: 'previewComponents',
                        data: preview.components || []
                    });
                    this.$store.commit('setState', {
                        key: 'css',
                        data: preview.css || ''
                    });
                }
            });
        },
        // 保存操作
        strogeComponents () {
            this.$Notice.success({
                title: '成功',
                desc: '视图保存成功。',
                duration: 1.3,
                onClose: () => {
                    let preview = JSON.stringify({
                        components: this.previewComponents,
                        css: this.previewCSS
                    });
                    
                    window.localStorage.setItem('preview', preview);
                }
            });
        },
        // 编辑器创建完成回调
        onMountedCSS (monaco) {
            
        },
        // 编辑器内容changge事件
        onCodeChangeCSS (value, e) {
            this.$store.commit('setState', {
                key: 'css',
                data: value
            });
            scopedStyle(this.$refs.preview.$el, this.previewCSS, 'custom-layout');
        },
    }
}
</script>

<style src="../assets/css/home.css" scoped></style>
<style>
/* 滚动条样式 */
*::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}
*::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0.1);
}
*::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0.1);
}
</style>

