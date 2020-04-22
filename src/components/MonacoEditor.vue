<template>
    <div class="monaco-cssEditor">
        <div id="container" ref="container" style="height:100%"></div>
    </div>
</template>

<script>
import * as monaco from 'monaco-editor';
export default {
    name: 'MonacoEditor',
    data () {
        return {
            onCodeChangeTimer: null
        }
    },
    props: {
        codes: {
            type: String,
            default: function () {
                return '请编辑...'
            }
        },
        language: {
            type: String,
            default: function () {
                return 'html'
            }
        },
        editorOptions: {
            type: Object,
            default: function () {
                return {
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,        // 只读
                    cursorStyle: 'line',        //光标样式
                    automaticLayout: false, //自动布局
                    glyphMargin: true,  //字形边缘
                    useTabStops: false,
                    fontSize: 28,       //字体大小
                    autoIndent: true,//自动布局
                    //quickSuggestionsDelay: 500,   //代码提示延时
                }
            }
        }
    },
    components: {

    },
    mounted () {
        this.initEditor();
    },
    methods: {
        initEditor () {
            this.$refs.container.innerHTML = '';
            this.monacoEditor = monaco.editor.create(this.$refs.container, {
                value: this.codesCopy || this.codes,
                language: this.language,
                editorOptions: this.editorOptions,
            });
            this.$emit('onMounted', this.monacoEditor);                     // 编辑器创建完成回调
            this.monacoEditor.onDidChangeModelContent( (event)=> {          // 编辑器内容changge事件
                // 节流200毫秒执行
                clearTimeout(this.onCodeChangeTimer);
                this.onCodeChangeTimer = setTimeout(() => {
                    this.codesCopy = this.monacoEditor.getValue();
                    this.$emit('onCodeChange', this.monacoEditor.getValue(), event);
                }, 200);
            });
            //编辑器随窗口自适应
            window.addEventListener('resize', ()=>{
                this.initEditor();
            })
        },
    },
}
</script>

<style scoped>
</style>
