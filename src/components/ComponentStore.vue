<template>
    <div class="components-store">
        <div
            class="components-block"
            v-for="(item,index) in componentStore"
        >
            <div class="components-sealbox" draggable="true" @dragstart="dragStart($event,item)">
                <div :id="item.info.id"></div>
            </div>
        </div>
    </div>
</template>

<script>
import mount from '@/utils/mount'
export default {
    name: 'componentStore',
    data () {
        return {
            
        }
    },
    props: {
        
    },
    components: {

    },
    computed: {
        // 使用vuex管理组件仓库
        componentStore (value) {
            return this.$store.state.componentStore;
        }
    },
    created () {

    },
    mounted () {
        this.mount();
    },
    methods: {
        mount () {
            //更新视图中组件的位置信息
            this.componentStore.forEach(component => {
                //预览模式 去掉选中边框
                mount(component.info.id, component)
            })
        },
        dragStart(e,component) {
            this.$set(component.info,'id',this.$global.guid());
            
            e.dataTransfer.setData('dragingComponent', JSON.stringify(component));
            
        }
    },
}
</script>

<style scoped>
.components-block {
    margin: 5px;
    padding: 10px 5px;
    width: calc(100% - 10px);
    overflow: hidden;
    box-sizing: border-box;
    border: 1px dashed #fff;
}
.components-block:hover {
    border-color: #207ee0;
}
.components-block >>> div {
    overflow: hidden;
}
.components-sealbox {
    height: 100%;
    transform: scale(0.85);
    transition: 0.5s;
}
.components-sealbox:hover {
    cursor: move;
    transform: scale(1);
}
</style>
