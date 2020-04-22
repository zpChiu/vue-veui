<template>
    <div class="sub-attribute">
        <Form ref="formInline" :model="attres" label-position="left">
            <template v-if="attres" v-for="(attr,key,index) in attres">
                <FormItem :label="attr.name">
                    <Icon type="md-alert" size="19" color="#f90" title="点击查看温馨提示" v-if=" attr.tips && attr.tips!=='' "/>
                    <Input
                        type="text"
                        v-model="attr.value"
                        :placeholder="attr.placeholder"
                        @on-change="updateAttribute"
                    ></Input>
                </FormItem>
            </template>
        </Form>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            attres: {},
            updateTimer: null,
        }
    },
    props: {
        attributes: {
            type: Object,
            default: null,
        }
    },
    watch: {
        attributes: {
            deep: true,
            handler (val, oldVal) {
                this.attres = JSON.parse(JSON.stringify(val))
            }
        }
    },
    components: {

    },
    created () {
        this.attres = JSON.parse(JSON.stringify(this.attributes));
    },
    methods: {
        updateAttribute () {
            // 节流更新
            clearTimeout(this.updateTimer);
            this.updateTimer = setTimeout(() => {
                this.$emit('update', this.attres)
            }, 150);
        }
    },
}
</script>

<style scoped>
.sub-attribute >>> .ivu-form-item {
    margin-bottom: 12px;
}
.sub-attribute >>> .ivu-form-item-label {
    font-weight: 550;
    font-size: 15px;
}
.sub-attribute >>> .ivu-input {
    color: #555;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #e7e7e7;
}
.sub-attribute >>> .ivu-input:focus {
    border-bottom-color: #57a3f3;
    box-shadow: none;
}
.sub-attribute >>> .ivu-input:hover {
    border-bottom-color: #57a3f3;
}
.sub-attribute >>> .ivu-icon {
    margin-top: 8px;
    cursor: pointer;
}
</style>
