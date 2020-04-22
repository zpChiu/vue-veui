<template>
    <!-- 预览视图 -->
    <section ref="preview" class="preview" @dragover="dragOver" @drop="drop">
        <div class="preview-area">
            <div
                v-for="(item,index) in previewComponents"
                :class="['preview-block',{'active-component':(currentComponent?currentComponent.info.id:'')===item.info.id}]"
                
                @click="selectedComponent(item)"
            >
                <div :id="item.info.id"></div>
            </div>
        </div>
    </section>
</template>

<script>
import mount from '@/utils/mount'
export default {
    name: 'VisualProduct',
    data () {
        return {

        }
    },
    props: {
        
    },
    components: {

    },
    watch: {
        
    },
    computed: {
        // 使用vuex管理预览区组件
        previewComponents: {
            get (value) {
                return this.$store.state.previewComponents;
            }
        },
        // 使用vuex管理当前拖曳组件
        currentComponent: {
            get (value) {
                return this.$store.state.currentComponent;
            }
        },
        // 预览页面的CSS
        previewCSS: {
            get (value) {
                if (this.$store.state.css === '') {
                    return codes;
                }
                return this.$store.state.css;
            }
        },
    },
    watch: {

    },
    mounted () {
        this.mount();
    },
    updated () {
        
    },
    methods: {
        mount () {
            // 刚开始加载视图中的组件, 默认选中第一个为当前组件
            this.$store.commit('setState', {
                key: 'currentComponent',
                data: this.previewComponents[0]
            });
            
            // 实例化所有视图中的组件
            this.previewComponents.forEach(component => {
                mount(component.info.id, component);
            });
        },
        dragOver(e) {
            e.preventDefault();
        },
        // 松开拖放,e是容器元素
        drop(e) {
            let dragingComponent = JSON.parse(e.dataTransfer.getData('dragingComponent'));

            mount(dragingComponent.info.id, dragingComponent);

            // 拖放后, 更新属性面板
            this.$store.commit('setState', {
                key: 'currentComponent',
                data: dragingComponent
            });

            // 拖放后, 更新视图组件数据, 保存需用
            this.$store.commit('addPreviewComponents',dragingComponent);
        },
        // 选中当前组件
        selectedComponent (component) {
            // 拖放后, 更新属性面板
            this.$store.commit('setState', {
                key: 'currentComponent',
                data: component
            });
        },
    },
}
</script>

<style scoped>
.preview{
    
}
.preview-block {
    cursor: move;
}
.active-component{
    border: 1px dashed #2792c3;
}
</style>
